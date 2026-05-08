#!/usr/bin/env python3
"""
Fetch all public Codex Pets data from codex-pets.net.

Outputs:
- tmp/codex-pets/index.json: summary metadata plus all pet details
- tmp/codex-pets/pets/<pet-id>.json: one file per pet detail payload
"""

from __future__ import annotations

import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


BASE_URL = "https://ihzwckyzfcuktrljwpha.supabase.co/functions/v1/petshare/api"
PAGE_SIZE = 30
USER_AGENT = "Mozilla/5.0 (compatible; CodexDataFetcher/1.0)"
MAX_WORKERS = 12


def fetch_json(url: str, timeout: int = 30) -> Any:
    request = Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    with urlopen(request, timeout=timeout) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return json.loads(response.read().decode(charset))


def fetch_all_list_pages() -> dict[str, Any]:
    first_page = fetch_json(f"{BASE_URL}/pets?page=1")
    total = int(first_page["total"])
    total_pages = int(first_page["totalPages"])
    pets = list(first_page["pets"])

    for page in range(2, total_pages + 1):
        payload = fetch_json(f"{BASE_URL}/pets?page={page}")
        pets.extend(payload["pets"])
        time.sleep(0.05)

    return {
        "total": total,
        "pageSize": int(first_page["pageSize"]),
        "totalPages": total_pages,
        "pets": pets,
    }


def fetch_pet_detail(pet_id: str) -> dict[str, Any]:
    payload = fetch_json(f"{BASE_URL}/pets/{pet_id}")
    return payload["pet"]


def load_or_fetch_detail(pet_id: str, pets_dir: Path) -> dict[str, Any]:
    detail_path = pets_dir / f"{pet_id}.json"
    if detail_path.exists():
        return json.loads(detail_path.read_text(encoding="utf-8"))

    detail = fetch_pet_detail(pet_id)
    detail_path.write_text(
        json.dumps(detail, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return detail


def main() -> int:
    output_root = Path("tmp") / "codex-pets"
    pets_dir = output_root / "pets"
    output_root.mkdir(parents=True, exist_ok=True)
    pets_dir.mkdir(parents=True, exist_ok=True)

    print("Fetching paginated pet list...", file=sys.stderr)
    listing = fetch_all_list_pages()
    listed_pets = listing["pets"]
    listed_ids = [pet["id"] for pet in listed_pets]

    detail_map: dict[str, dict[str, Any]] = {}
    failures: list[dict[str, str]] = []
    pending_ids = [pet_id for pet_id in listed_ids if not (pets_dir / f"{pet_id}.json").exists()]

    print(
        f"Reusing {len(listed_ids) - len(pending_ids)} cached details, fetching {len(pending_ids)} remaining...",
        file=sys.stderr,
    )

    completed = 0
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_map = {
            executor.submit(load_or_fetch_detail, pet_id, pets_dir): pet_id
            for pet_id in pending_ids
        }
        for future in as_completed(future_map):
            pet_id = future_map[future]
            try:
                detail_map[pet_id] = future.result()
            except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as exc:
                failures.append({"id": pet_id, "error": str(exc)})
            completed += 1
            if completed % 25 == 0 or completed == len(pending_ids):
                print(
                    f"Fetched {completed}/{len(pending_ids)} remaining pet details",
                    file=sys.stderr,
                )

    details: list[dict[str, Any]] = []
    for pet_id in listed_ids:
        try:
            details.append(load_or_fetch_detail(pet_id, pets_dir))
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as exc:
            failures.append({"id": pet_id, "error": str(exc)})

    result = {
        "fetchedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": {
            "baseApi": BASE_URL,
            "site": "https://codex-pets.net/",
        },
        "summary": {
            "totalFromListing": listing["total"],
            "pageSize": listing["pageSize"],
            "totalPages": listing["totalPages"],
            "listedCount": len(listed_pets),
            "detailFetchedCount": len(details),
            "failureCount": len(failures),
        },
        "listPets": listed_pets,
        "detailPets": details,
        "failures": failures,
    }

    (output_root / "index.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(
        json.dumps(
            {
                "output": str(output_root),
                "listedCount": len(listed_pets),
                "detailFetchedCount": len(details),
                "failureCount": len(failures),
            },
            ensure_ascii=False,
        )
    )
    return 0 if not failures else 1


if __name__ == "__main__":
    raise SystemExit(main())

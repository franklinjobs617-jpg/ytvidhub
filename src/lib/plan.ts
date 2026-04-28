export function getPlanLabel(plan?: string | null) {
  switch ((plan || "").trim().toLowerCase()) {
    case "a":
    case "ytvid_a_monthly":
      return "Pro";
    case "b":
    case "ytvid_b_monthly":
      return "Premium";
    case "c":
    case "ytvid_c_yearly":
      return "Researcher";
    case "ytvid_payg":
    case "yt_credits_custom":
      return "Credits Pack";
    default:
      return "Free";
  }
}

import json
import os

def fix_json(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    encodings = ['utf-8-sig', 'utf-8', 'latin-1']
    content = None
    for enc in encodings:
        try:
            with open(filepath, 'r', encoding=enc) as f:
                content = f.read()
            break
        except UnicodeDecodeError:
            continue
    
    if content is None:
        print(f"Could not read {filepath}")
        return
    
    # Remove the standalone comma after a brace if it exists
    content = content.replace('  }\n,\n  "footer":', '  },\n  "footer":')
    # Also handle possible \r\n
    content = content.replace('  }\r\n,\r\n  "footer":', '  },\r\n  "footer":')
    
    # Fix garbled text in es.json if it's there
    content = content.replace('extracci贸n', 'extracción')
    content = content.replace('dise帽ado', 'diseñado')
    content = content.replace('investigaci贸n', 'investigación')
    content = content.replace('subt铆tulos', 'subtítulos')
    content = content.replace('Gu铆a', 'Guía', )
    content = content.replace('preparaci贸n', 'preparación')
    content = content.replace('Transcripci贸n', 'Transcripción')
    content = content.replace('C贸mo', 'Cómo')
    content = content.replace('T茅rminos', 'Términos')

    try:
        data = json.loads(content)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Successfully fixed {filepath}")
    except Exception as e:
        print(f"Error parsing {filepath}: {e}")
        # If it failed to parse, let's look at the context of the error
        import traceback
        traceback.print_exc()

fix_json('src/messages/en.json')
fix_json('src/messages/es.json')

import os
import re
import sys
from pathlib import Path


COMMENT = os.environ["COMMENT"]


def fail(message):
    print(f"::error::{message}")
    sys.exit(1)


def extract_field(text, field):
    """
    Extracts a simple TOON field:

        konkani_word: gaai
        part_of_speech: nouns
    """

    match = re.search(
        rf"(?m)^{re.escape(field)}:\s*(\S.*?)(?:\r?\n|$)",
        text,
    )

    if not match:
        fail(f"Missing `{field}`.")

    return match.group(1).strip()


def extract_entry(comment):
    """
    Extract:

        /dori
        ```
        ...
        ```
    """

    match = re.match(
        r"(?s)^\s*/dori\s*```(?:\r?\n)?(.*?)```",
        comment,
    )

    if not match:
        fail("Invalid /dori command.")

    return match.group(1)


def main():
    entry = extract_entry(COMMENT)

    konkani_word = extract_field(entry, "konkani_word")
    part_of_speech = extract_field(entry, "part_of_speech")

    output = (
        Path("entries")
        / part_of_speech
        / f"{konkani_word}.toon"
    )

    output.parent.mkdir(parents=True, exist_ok=True)

    if output.exists():
        fail(f"Entry already exists: {output}")

    output.write_text(entry, encoding="utf-8")

    print(f"Created {output}")

    with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as f:
        f.write(f"file={output}\n")
        f.write(f"word={konkani_word}\n")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publish_npm.py — TidyFactor Umbrella CLI & Skills Publishing Shortcut
"""
import sys
import os
import subprocess
from pathlib import Path

SKILLS_LAB_PUBLISHER = Path(r"c:\wamp64\www\TidyFactor\Skills\Skills-LAB\tools\npm_publisher.py")

def main():
    print("=" * 65)
    print("  🚀 TIDYFACTOR NPM PUBLISHING SUITE (@tidyfactor)")
    print("=" * 65)
    print("  [1] Publish Umbrella CLI package (@tidyfactor/cli)")
    print("  [2] Open Interactive Skills Publisher (12 Community Skills)")
    print("  [Q] Exit")
    print("=" * 65)
    
    if len(sys.argv) > 1 and sys.argv[1] == "--cli":
        choice = "1"
    elif len(sys.argv) > 1 and sys.argv[1] in ["--skills", "--all"]:
        choice = "2"
    else:
        choice = input("\n👉 Enter selection [1, 2, Q]: ").strip()

    if choice == "1":
        print("\n📦 Publishing @tidyfactor/cli from C:\wamp64\www\TidyFactor\CLI\TidyFactor CLI...")
        subprocess.run("npm publish --access public", shell=True, cwd=str(Path(__file__).parent))
    elif choice == "2":
        if SKILLS_LAB_PUBLISHER.exists():
            subprocess.run([sys.executable, str(SKILLS_LAB_PUBLISHER)], cwd=str(SKILLS_LAB_PUBLISHER.parent.parent))
        else:
            print(f"❌ Could not find {SKILLS_LAB_PUBLISHER}")
    else:
        print("Goodbye!")

if __name__ == "__main__":
    main()


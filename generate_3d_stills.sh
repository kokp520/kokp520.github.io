#!/bin/bash

export PATH="/Users/adiwu/.local/bin:$PATH"

PREAMBLE="Isometric low-poly 3D diorama floating as a small rounded island on a plain solid #0F0E17 background with a soft contact shadow beneath it. Soft matte clay 3D render, rounded toy-model shapes, gentle warm studio lighting, soft long shadows, tilt-shift miniature look. Cohesive color palette of #FF8E3C, #2CB67D, #7F5AF0. Highly detailed, centered composition, absolutely no text, no letters, no numbers, no logos."

PROMPT_HUB="$PREAMBLE Subject: A futuristic retro PC terminal hub server room. A central mainframe rack with glowing indicator lights, surrounded by small floating screens and thick data cables connecting them."
PROMPT_GIF="$PREAMBLE Subject: A whimsical animated GIF decomposing factory. A large film reel feeding into a machine that extracts individual square frames onto a conveyor belt, dropping them into a neat cubic ZIP archive box."
PROMPT_JSON="$PREAMBLE Subject: A neon data pipeline refinery. Large glowing pipes shaping curly brackets and square brackets, processing glowing data cubes through a validation scanner station."
PROMPT_YAML="$PREAMBLE Subject: A data conversion control tower. A tiered, indented structure with blocks of data perfectly aligned, featuring a mechanical crane seamlessly moving blocks from one level to another."
PROMPT_EXIT="$PREAMBLE Subject: A classic retro arcade cabinet machine. A standalone arcade unit with glowing buttons, a joystick, and a bright screen, placed on a neat platform."

mkdir -p public/scroll-world/stills

generate_image() {
    local prompt="$1"
    local output_file="$2"
    echo "Generating $output_file..."
    
    # Run the generation and capture the JSON output
    local json_out=$(higgsfield generate create gpt_image_2 --prompt "$prompt" --resolution 2k --quality high --aspect_ratio 3:2 --wait --json)
    
    # Extract the result URL using jq
    local url=$(echo "$json_out" | grep -o '"url": *"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [[ -n "$url" ]]; then
        echo "Downloading to $output_file from $url..."
        curl -s -L "$url" -o "$output_file"
        echo "Done $output_file"
    else
        echo "Failed to get URL for $output_file. JSON output was: $json_out"
    fi
}

# Run them in parallel
generate_image "$PROMPT_HUB" "public/scroll-world/stills/still_hub.jpg" &
generate_image "$PROMPT_GIF" "public/scroll-world/stills/still_gif.jpg" &
generate_image "$PROMPT_JSON" "public/scroll-world/stills/still_json.jpg" &
generate_image "$PROMPT_YAML" "public/scroll-world/stills/still_yaml.jpg" &
generate_image "$PROMPT_EXIT" "public/scroll-world/stills/still_exit.jpg" &

wait
echo "All images generated."

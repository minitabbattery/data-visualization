import os
import csv
import json

# Get the current directory where the script is located
current_dir = os.path.dirname(os.path.abspath(__file__))

# Loop through all files in the directory
for file_name in os.listdir(current_dir):
    if file_name.endswith('.txt'):  # Check if the file is a .txt file
        input_file = os.path.join(current_dir, file_name)
        output_file = os.path.splitext(file_name)[0] + '.json'  # Output JSON file name based on input file name

        # Function to read TSV file and convert to JSON
        def convert_tsv_to_json(input_file, output_file):
            with open(input_file, 'r', newline='') as tsvfile:
                reader = csv.DictReader(tsvfile, delimiter='\t')
                data = [row for row in reader]

            # Write JSON data to output file
            with open(output_file, 'w') as jsonfile:
                json.dump(data, jsonfile, indent=4)

        # Call the function to convert TSV to JSON for each file
        convert_tsv_to_json(input_file, output_file)

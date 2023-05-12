# import pyclamav

# file_path = '/path/to/file'

# # Initialize the ClamAV engine
# pyclamav.init()

# # Scan the file for malware
# result = pyclamav.scan_file(file_path)

# # Check if the file is infected
# if result != 0:
#     print('The file is infected!')
# else:
#     print('The file is clean.')

import openai
import json
# https://github.com/MarlinFirmware/Marlin

openai.api_key = "YOUR_API_KEY"

def generate_text(prompt):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    return response.choices[0].text.strip()

prompt = "Hello, can you please tell me about the weather today?"

response = generate_text(prompt)

print(response)



# activate bash scrpits
# .\vlmenv\Scripts\activate

import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

response = requests.get('https://www.safaricom.co.ke/', headers=headers)
print(response.text)



import requests

# Set the headers required for the request
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Referer': 'https://www.safaricom.co.ke/',
    'Origin': 'https://www.safaricom.co.ke/',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
}

# Set the parameters required for the request
data = {
    'product_id': '123456',  # Replace with the actual product ID
    'amount': '100',  # Replace with the actual amount
    'phone': '0712345678',  # Replace with the actual phone number
}

# Make the request to buy airtime
response = requests.post('https://www.safaricom.co.ke/bundles-services/buy-airtime', headers=headers, data=data)

# Print the response content
print(response.text)

#!/usr/bin/env python
import subprocess
with open("output.txt", "w+") as output:
    subprocess.call(["python", "./script.py"], stdout=output)
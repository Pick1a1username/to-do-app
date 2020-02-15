#!/usr/local/bin/python

import json
import sys

from pymongo import MongoClient


def main():
    # Load data.
    import_data = {}

    with open('data.json', 'r') as reader:
        import_data = json.loads(reader.read())

    # Connect.
    client = MongoClient('mongo', 27017, username='mongoadmin', password='thisispassword')

    # Create a db named 'catalog'.
    db = client['catalog']

    # Create an user for db 'catalog'.
    db.command("createUser", "catalog_admin", pwd="some_password", roles=["readWrite"])

    # Insert documents to collection 'items'.
    items = db['items']

    result = items.insert_many(import_data)

    sys.exit(0)

main()

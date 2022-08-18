import json

import pandas as pd


filename = "/Users/evgenkorzhik/Downloads/854c2c06-d111-41ee-9410-95706b9edd4d/NameUsage.tsv"


def run():
    df = pd.read_csv(filename, sep='\t', nrows=200)
    df = df.reset_index()  # make sure indexes pair with number of rows

    df.to_csv('/Users/evgenkorzhik/Downloads/854c2c06-d111-41ee-9410-95706b9edd4d/NameUsage200.tsv')

    for index, row in df.iterrows():
        print(row['col:family'])
run()


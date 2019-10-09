import pandas as pd

def proccess_file_upload(uploaded_file):
    file_name = 'temp.csv'
    file_path = 'data/' + file_name

    with open(file_path, 'wb+') as file:
        for chunk in uploaded_file.chunks():
            file.write(chunk)

    return pd.read_csv(file_path)

from fastapi import FastAPI, File, UploadFile, HTTPException
import pandas as pd
import xmltodict
import json 
app = FastAPI()
def parse_json_fields(data):
    json_fields = ['imgDisplay']  

    for field in json_fields:
        if field in data:
            try:
                # Convert JSON strings to Python objects
                data[field] = data[field].apply(json.loads)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Error parsing JSON for field {field}: {str(e)}")

    return data



@app.post("/read-file")
async def analyze_file(file: UploadFile = File(...)):
    try:
        # Determine file type and process
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        elif file.filename.endswith(".xlsx") or file.filename.endswith(".xls"):
            df = pd.read_excel(file.file)
        elif file.filename.endswith(".xml"):
            file_content = file.file.read()
            xml_dict = xmltodict.parse(file_content)
            data = xml_dict['root']['product']  
            df = pd.DataFrame(data)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        df = parse_json_fields(df)

        analysis_result = {
            "columns": df.columns.tolist(),
            "data": df.to_dict(orient="records"),
        }

        return analysis_result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

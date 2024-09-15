from fastapi import FastAPI, File, Form, UploadFile, HTTPException, Request
from fastapi.responses import StreamingResponse
import pandas as pd
import xmltodict
import json
from io import StringIO  

app = FastAPI()
def extract_product_info(product: dict):
    details = product["details"] if "details" in product else {}

    brand = details["brand"]["value"] if isinstance(details.get("brand"), dict) and "value" in details["brand"] else "never"
    size = ", ".join([s["value"] for s in details["size"] if isinstance(s, dict) and "value" in s]) if "size" in details else ""
    sillage = details["sillage"]["value"] if isinstance(details.get("sillage"), dict) and "value" in details["sillage"] else ""
    longevity = details["longevity"]["value"] if isinstance(details.get("longevity"), dict) and "value" in details["longevity"] else ""
    fragranceNotes = details["fragranceNotes"]["value"] if isinstance(details.get("fragranceNotes"), dict) and "value" in details["fragranceNotes"] else ""
    concentration = details["concentration"]["value"] if isinstance(details.get("concentration"), dict) and "value" in details["concentration"] else ""
    sex = details["sex"]["value"] if isinstance(details.get("sex"), dict) and "value" in details["sex"] else ""
    description = details["description"] if "description" in details else ""
    tutorial = details["tutorial"] if "tutorial" in details else ""

    return {
        "id": product["id"] if "id" in product else '',
        "name": product["name"] if "name" in product else '',
        "originCost": product["originCost"] if "originCost" in product else 0,
        "displayCost": product["displayCost"] if "displayCost" in product else 0,
        "stockQuantity": product["stockQuantity"] if "stockQuantity" in product else 0,
        "category": product["category"] if "category" in product else '',
        "brand": brand,
        "size": size,
        "sillage": sillage,
        "longevity": longevity,
        "fragranceNotes": fragranceNotes,
        "concentration": concentration,
        "sex": sex,
        "description": description,
        "tutorial": tutorial,
        "rating": product["rating"] if "rating" in product else 0,
        "buyCount": product["buyCount"] if "buyCount" in product else 0,
        "created_at": product["created_at"] if "created_at" in product else '',
        "updated_at": product["updated_at"] if "updated_at" in product else '',
    }



@app.post("/export-file")
async def export_csv(request: Request):

    data = await request.json()
    flat_data = [extract_product_info(product) for product in data]

    df = pd.DataFrame(flat_data)
    df = pd.DataFrame(data)

    csv_buffer = StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)


    response = StreamingResponse(csv_buffer, media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=report-product.csv"
    
    return response


@app.post("/read-file")
async def analyze_file(file: UploadFile = File(...), typeFile = Form(...)):
    try:
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
        dataType = json.loads(typeFile)
        if dataType['type'] == "products":

            products = []
            for _, row in df.iterrows():
                product_json = {
                    "name": row['name'],
                    "originCost": row['originCost'],
                    "displayCost": row['displayCost'],
                    "stockQuantity": row['stockQuantity'],
                    "category": row['category'],
                    "details": {
                        "brand": {
                            "type": "brand",
                            "value": row['brand']
                        },
                        "size": [{"type": "size", "value": row['size']}],
                        "sillage": {"type": "sillage", "value": row['sillage']},
                        "longevity": {"type": "longevity", "value": row['longevity']},
                        "fragranceNotes": {"type": "fragranceNotes", "value": row['fragranceNotes']},
                        "concentration": {"type": "concentration", "value": row['concentration']},
                        "sex": {"type": "sex", "value": row['sex']},
                        "description": row['description'],
                        "tutorial": row['tutorial']
                    }
                }
                products.append(product_json)
            return products

        elif dataType['type'] == "users":
            users = []
            for _, row in df.iterrows():
                user_json = {
                    "email": row['email'],
                    "username": row['username'],
                    "password": row['password'],
                    "firstName": row['firstName'],
                    "lastName": row['lastName'],
                    "role": [row['role']],
                    "phoneNumber": [row['phoneNumber']],
                    "birthday": row['birthday'],
                    "address": row['address'],
                    "gender": row['gender']
                }
                users.append(user_json)
            return users

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

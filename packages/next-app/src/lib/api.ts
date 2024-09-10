import { Perfume, ProductType } from "@/types";
import { Backend_URL } from "./Constants";
import { SignUpDto } from "./dtos/auth";
import axios from 'axios';


async function refreshTokenApi(refreshToken: string): Promise<string | null> {
    try {
        const response = await fetch(Backend_URL + "/auth/refreshToken", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            return data.access_token;
        } else {
            console.error("Failed to refresh access token:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error while refreshing access token:", error);
        return null;
    }
}

export async function makeRequestApi(callback: Function, dto: any, refreshToken: string | undefined, accessToken: string | undefined) {
    try {
        if (accessToken == undefined) return null;
        const data = await callback(dto, accessToken);

        if (data == null && refreshToken !== undefined) {
            const newAccessToken = await refreshTokenApi(refreshToken);

            if (newAccessToken) {
                return await callback(dto, newAccessToken);
            } else {
                console.log('Unauthorized!');
                return null;
            }
        } else {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}



export async function signUpApi(dto: SignUpDto) {
    const res = await fetch(Backend_URL + "/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}


export async function GetHotSaleProductForHome(sex: string) {
    const query = `
    query SearchProductWithOptions {
      SearchProductWithOptions(
        SearchProduct: {
          index: 1
          count: 10
          hotSales: "week"
          sex: { type: "sex", value: "${sex}" }
        }
      ) {
        displayCost
        name
        details {
            id
            imgDisplay {
                id
                link
                url
            }
            brand {
                id
                type
                value
            }
        }
        id
      }
    }
  `;

    try {
        const response = await axios.post(Backend_URL + '/graphql', {
            query: query,
        });

        const res : ProductType[] =  response.data.data.SearchProductWithOptions;
        const dataReturn : Perfume[] = []
        for (const item of res) {
            dataReturn.push({
                img: item.details?.imgDisplay?.[0]?.url || null,
                name: item.name,
                brand: item.details?.brand?.value || null, 
                cost: item.displayCost.toLocaleString('vi-VN') + ' VNĐ'

            } as Perfume)
        }
        return dataReturn
    } catch (error) {
        console.error('Error fetching hot sale products:', error);
        throw error;
    }
}

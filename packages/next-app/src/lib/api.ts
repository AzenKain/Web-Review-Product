import axios from 'axios';
import { Perfume, ProductType, TagsDetailType, Product } from "@/types";
import { Backend_URL } from "./Constants";
import { SignUpDto } from "./dtos/auth";
import { SearchProductDto } from "./dtos/product";

async function refreshTokenApi(refreshToken: string): Promise<string | null> {
    try {
        const response = await fetch(Backend_URL + "/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
        });

        if (response.status === 201) {
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
        data {
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
        maxValue
      }
    }
  `;

    try {
        const response = await axios.post(Backend_URL + '/graphql', {
            query: query,
        });

        const res: ProductType[] = response.data.data.SearchProductWithOptions.data;
        const maxValue = response.data.data.SearchProductWithOptions.maxValue

        const dataReturn: Perfume[] = []
        for (const item of res) {
            dataReturn.push({
                img: item.details?.imgDisplay?.[0]?.url || null,
                name: item.name,
                brand: item.details?.brand?.value || null,
                cost: item.displayCost.toLocaleString('vi-VN') + ' VNĐ',
                id: item.id
            } as Perfume)
        }
        return {maxValue: maxValue, data: dataReturn};
    } catch (error) {
        console.error('Error fetching: ', error);
        throw error;
    }
}

export async function GetProductForSearch(dto: SearchProductDto) {
    const query = `
    query SearchProductWithOptions {
      SearchProductWithOptions(
        SearchProduct: {
          name: ${dto.name ? `"${dto.name}"` : null}
          rangeMoney: ${dto.rangeMoney ? `[${dto.rangeMoney.join(', ')}]` : null}
          size: ${dto.size ? `[${dto.size.map(item => `{ type: "${item.type}", value: "${item.value || ''}" }`).join(', ')}]` : null}
          brand: ${dto.brand ? `[${dto.brand.map(item => `{ type: "${item.type}", value: "${item.value || ''}" }`).join(', ')}]` : null}
          fragranceNotes: ${dto.fragranceNotes ? `[${dto.fragranceNotes.map(item => `{ type: "${item.type}", value: "${item.value || ''}" }`).join(', ')}]` : null}
          concentration: ${dto.concentration ? `[${dto.concentration.map(item => `{ type: "${item.type}", value: "${item.value || ''}" }`).join(', ')}]` : null}
          sex: ${dto.sex ? `[${dto.sex.map(item => `{ type: "${item.type}", value: "${item.value || ''}" }`).join(', ')}]` : null}
          index: ${dto.index || 1}
          count: ${dto.count || 10}
          sort: ${dto.sort ? `"${dto.sort}"` : null}
          hotSales: ${dto.hotSales ? `"${dto.hotSales}"` : null}
        }
      ) {
        data {
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
        maxValue
      }
    }
  `;

    try {
        const response = await axios.post(Backend_URL + '/graphql', { query });

        const res: ProductType[] = response.data.data.SearchProductWithOptions.data;
        const maxValue = response.data.data.SearchProductWithOptions.maxValue
        const dataReturn: Perfume[] = [];

        for (const item of res) {
            dataReturn.push({
                img: item.details?.imgDisplay?.[0]?.url || null,
                name: item.name,
                brand: item.details?.brand?.value || null,
                cost: item.displayCost.toLocaleString('vi-VN') + ' VNĐ',
                id: item.id
            } as Perfume);
        }

        return {maxValue: maxValue, data: dataReturn};
    } catch (error) {
        console.error('Error fetching: ', error);
        throw error;
    }
}

export async function GetTagsProduct(tag: string | null = null) {
    const query = `
      query GetTagsProduct {
        GetTagsProduct(GetTagsProduct: { tags: ${tag ? `"${tag}"` : null} }) {
          id
          type
          value
        }
      }
    `;

    try {
        const response = await axios.post(Backend_URL + '/graphql', {
            query: query,
        });

        const res: TagsDetailType[] = response.data.data.GetTagsProduct;
        return res
    } catch (error) {
        console.error('Error fetching: ', error);
        throw error;
    }
}

export async function GetProductById(id: number) {
    const query = `
        query GetProductById {
            GetProductById(productId: ${id}) {
                displayCost
                id
                isDisplay
                name
                originCost
                rating
                stockQuantity
                updated_at
                buyCount
                details {
                    brand {
                        id
                        type
                        value
                    }
                    fragranceNotes {
                        id
                        type
                        value
                    }
                    description
                    concentration {
                        id
                        type
                        value
                    }
                    imgDisplay {
                        id
                        link
                        url
                    }
                    longevity {
                        id
                        type
                        value
                    }
                    sex {
                        id
                        type
                        value
                    }
                    sillage {
                        id
                        type
                        value
                    }
                    size {
                        id
                        type
                        value
                    }
                    tutorial
                }
            }
        }

  `;

    try {
        const response = await axios.post(Backend_URL + '/graphql', {
            query: query,
        });

        const res: Product = {
            ...response.data.data.GetProductById,
            displayCost: response.data.data.GetProductById.displayCost.toLocaleString('vi-VN') + ' VNĐ'
        }
        return res
    } catch (error) {
        console.error('Error fetching: ', error);
        throw error;
    }
}


export async function uploadFile(data: File, accessToken: string) {
    try {
        const formData = new FormData();
        formData.append('file', data); 
        const response = await axios.post('/media/upload', formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data', 
            },
        });
        if (response.status == 200) {
            return Backend_URL + response.data['url'];  
        }
    } catch (error: any) {
        console.error('Upload failed:', error.response ? error.response.data : error.message);
        throw error; 
    }
}

export async function SearchProductWithOptions(name: string | null) {
    const query = `
    query SearchProductWithOptions {
      SearchProductWithOptions(SearchProduct: { name: ${name !== null ? `"${name}"` : "null"} }) {
        data {
          id
          name
        }
      }
    }
  `;

    try {
        const response = await axios.post(Backend_URL + "/graphql", {
            query: query,
        });

        const res = response.data.data.SearchProductWithOptions;
        return res;
    } catch (error) {
        console.error("Error fetching: ", error);
        throw error;
    }
}

export async function CreateUser(userData: {
    email?: string,
    birthday?: string,
    address?: string,
    firstName?: string,
    gender?: string,
    lastName?: string,
    password?: string,
    phoneNumber?: string,
    role?: string,
    userId?: string,
    username?: string,
}) {
    const mutation = `
        mutation CreateUser {
            CreateUser(
                CreateUser: {
                    email: "${userData.email}"
                    birthday: "${userData.birthday}"
                    address: "${userData.address}"
                    firstName: "${userData.firstName}"
                    gender: "${userData.gender}"
                    lastName: "${userData.lastName}"
                    password: "${userData.password}"
                    phoneNumber: "${userData.phoneNumber}"
                    role: "${userData.role}"
                    userId: "${userData.userId}"
                    username: "${userData.username}"
                }
            ) {
                created_at
                email
                hash
                id
                isDisplay
                refreshToken
                role
                secretKey
                updated_at
                username
            }
        }
    `;

    try {
        const response = await axios.post(Backend_URL + '/graphql', {
            query: mutation,
        });

        return response.data.data.CreateUser;
    } catch (error) {
        console.error('Error creating user: ', error);
        throw error;
    }
}

export async function getAllUserName(accessToken?: string) {
    const query = `
    query SearchUserWithOption {
      SearchUserWithOption(SearchUser: { index: 1 }) {
        data {
          username
          id
          secretKey
        }
      }
    }
  `;

    try {
        const response = await axios.post(
            `${Backend_URL}/graphql`,
            { query: query },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken || ""}`,
                },
            }
        );

        return response.data.data.SearchUserWithOption.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export async function getUserById(id: string, token: string) {
    const query = `
        query GetUserById {
            GetUserById(id: "${id}") {
                created_at
                email
                id
                isDisplay
                refreshToken
                role
                secretKey
                updated_at
                username
            }
        }
    `;

    try {
        const response = await axios.post(
            `${Backend_URL}/graphql`,
            { query },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data.GetUserById;
    } catch (error) {
        console.error('Error fetching user: ', error);
        throw error;
    }
}

export async function getAnalyticsRevenue(dto : any, accessToken?: string) {
    const query = `
        query AnalyticRevenue {
            AnalyticRevenue{
                dataAllTime {
                    totalOrder
                    totalProduct
                    totalProfit
                    totalRevenue
                }
                dataMonth {
                    Date
                    productSold
                    profit
                    revenue
                }
                dataWeek {
                    name
                    xData
                    yData
                }
            }
        }
  `;

    try {
        const response = await axios.post(
            `${Backend_URL}/graphql`,
            { query: query },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken || ""}`,
                },
            }
        );

        return response.data.data.AnalyticRevenue;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}


export async function getAnalyticsFavorite(dto : any, accessToken?: string) {
    const query = `
        query AnalyticFavorite {
            AnalyticFavorite {
                dataBrand {
                    type
                    value
                }
                dataSex {
                    type
                    value
                }
            }
        }
  `;

    try {
        const response = await axios.post(
            `${Backend_URL}/graphql`,
            { query: query },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken || ""}`,
                },
            }
        );

        return response.data.data.AnalyticFavorite;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export async function getAnalyticsProduct(dto : any, accessToken?: string) {
    const query = `
        query AnalyticProduct {
            AnalyticProduct {
                dataBrand {
                    type
                    value
                }
                dataSex {
                    type
                    value
                }
            }
        }

  `;

    try {
        const response = await axios.post(
            `${Backend_URL}/graphql`,
            { query: query },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken || ""}`,
                },
            }
        );

        return response.data.data.AnalyticProduct;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}
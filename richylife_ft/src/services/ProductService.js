import axios from "axios";
import {useAsync} from "react-async-hook";

export const ProductService = {
    async CreateProduct(product){
        let form_data = new FormData()

        for ( let key in product ) {
            form_data.append(key, product[key]);
        }

        return await axios.post('http://localhost:8000/api/ms2/product/create', form_data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

    },
    async CreateNewComment(productInfo){

        return await axios.post('http://localhost:8000/api/ms1/comment/create', JSON.stringify({
            author: productInfo.author,
            text: productInfo.text,
            product_id: productInfo.product_id,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

    },

    GetProductList(){
        return useAsync(async () => {
            const response = await fetch(`http://localhost:8000/api/ms2/products`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.json()
        }, [])
    },
    GetProductInfo(searchParams){
        return useAsync(async () => {
            const response = await fetch(`http://localhost:8000/api/ms2/products/${searchParams.product_id}?${new URLSearchParams({q:searchParams.q}).toString()}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.json()
        }, [`?${new URLSearchParams(searchParams).toString()}`])
    },
}
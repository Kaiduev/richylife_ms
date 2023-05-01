import React, {useEffect, useState} from 'react';
import '../styles/home.css'
import {ProductService} from "../services/ProductService";

const Home = () => {
    const [page, setPage] = useState('productList')

    //create new product
    const [newProduct, setNewProduct] = useState({
        name:'',
        desc:'',
        banner: '',
        price: '',
    })
    const submitProductAdd = (event) => {
        event.preventDefault()
        console.log(newProduct)
        ProductService.CreateProduct(newProduct).then(()=>{
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
    }

    //list of products
    const [filter, setFilter] = useState({
        q: 'no',
        updateRequest: false,
    })
    const listOfProductsFromApi = ProductService.GetProductList()

    const [productList, setProductList] = useState([
    ])

    useEffect(()=>{
        if(!listOfProductsFromApi.loading && !listOfProductsFromApi.error){
            setProductList(listOfProductsFromApi.result.map((product)=>({
                _id: product._id,
                name:product.name,
                banner: product.banner,
                price: product.price,
            })))
        }
    },[listOfProductsFromApi.loading])

    //product detail
    const [productInfo, setProductInfo] = useState({
        name:'',
        desc:'',
        banner: '',
        price: null,
        comments:[],
    })


    const [selectedProduct, setSelectedProduct] = useState('')

    const productInfoFromApi = ProductService.GetProductInfo({product_id:selectedProduct, ...filter})
    useEffect(()=>{
        if(!productInfoFromApi.loading && !productInfoFromApi.error && selectedProduct !== ''){
            setNewComment({
                ...newComment,
                product_id: selectedProduct
            })
            setProductInfo({
                name: productInfoFromApi.result['product'].name,
                desc: productInfoFromApi.result['product'].desc,
                banner: productInfoFromApi.result['product'].banner,
                price: productInfoFromApi.result['product'].price,
                comments: productInfoFromApi.result.comments.map((comment)=>({
                            _id: comment._id,
                            author: comment.author,
                            product_id: comment.product_id,
                            text: comment.text,
                }))
            })
        }
    },[productInfoFromApi.loading])

    // create comments

    const [newComment, setNewComment] = useState({
        author: '',
        text: '',
        product_id: '',
    })
    const createComment = (event) => {
        event.preventDefault()
        ProductService.CreateNewComment(newComment).then(()=>{
            setFilter({
                ...filter,
                updateRequest: !filter.updateRequest
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className='main'>
            <div className="mainContainer">
                <div className="navButtons">
                    <button onClick={()=>{setPage('productList')}}>Products</button>
                    <button onClick={()=>{setPage('productAdd')}}>Create Product</button>
                </div>

                {page === 'productList' &&
                    <>
                        <h1>Product list</h1><br/><br/>
                        <div className='productList'>

                            {productList.map((product, i)=>(
                                <div className="productCard" key={i} onClick={()=>{
                                    setPage('productView')
                                    setSelectedProduct(product._id)
                                }}>
                                    <div className="productCard__imageBox" style={{backgroundImage: `url(${product.banner})`}}>
                                        {!product.banner && 'no photo'}
                                    </div>
                                    <div className="productCard__textBox">
                                        <p className='productCard__name'>{product.name}</p>
                                        <span className='productCard__price'>{product.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                }
                {page === 'productAdd' &&
                    <form action="" className='productAdd' onSubmit={submitProductAdd}>
                        <h1>Product add</h1>

                        <input className='productAdd__textInput' required={true} placeholder='name' type="text" value={newProduct.name} onChange={(event)=>{
                            setNewProduct({
                                ...newProduct,
                                name: event.target.value
                            })
                        }}/>
                        <input className='productAdd__textInput' required={true} placeholder='description' type="text" value={newProduct.desc} onChange={(event)=>{
                            setNewProduct({
                                ...newProduct,
                                desc: event.target.value
                            })
                        }}/>
                        <input className='productAdd__textInput' required={true} placeholder='price' type="number" value={newProduct.price} onChange={(event)=>{
                            setNewProduct({
                                ...newProduct,
                                price: event.target.value
                            })
                        }}/>
                        <input className='productAdd__textInput' required={true} placeholder='banner_url' type="text" value={newProduct.banner} onChange={(event)=>{
                            setNewProduct({
                                ...newProduct,
                                banner: event.target.value
                            })
                        }}/>

                        <button type='submit' className='productAdd__submitButton'>
                            submit
                        </button>
                    </form>
                }

                {page === 'productView' &&
                    <div className='productView'>
                        <h1>product details</h1><br/><br/>
                        <div className="productView__imgBox" style={{backgroundImage: `url(${productInfo.banner})`}}>
                            {!productInfo.banner && 'no photo'}
                        </div>
                        <div className="productView__textBox">
                            <h1 className='productView__name'>{productInfo.name}</h1>
                            <span className='productView__price'>{productInfo.price}</span>
                            <p className='productView__desc'>{productInfo.desc}</p>
                        </div>
                        <br/><br/>
                        <div className="productView__comments">
                            <div className='productView__filtersBox'>
                                <h1>comments</h1>
                                <span>Orange?</span>
                                <div className='productView__filters'>
                                    <button type='button' onClick={()=>{setFilter({...filter, q: 'yes'})}}
                                        className={`productViewFilters__button ${filter.q==='yes' ? 'productViewFilters__button_selected': ''}`}>
                                        Yes
                                    </button>
                                    <button type='button' onClick={()=>{setFilter({...filter, q: 'no'})}}
                                        className={`productViewFilters__button ${filter.q==='no' ? 'productViewFilters__button_selected': ''}`}>
                                        No
                                    </button>
                                </div>
                            </div><br/><br/>
                            {productInfo.comments.map((comment, i)=>(
                                <div className='productView__comment' key={i}>
                                    <span>{comment.author}</span>
                                    <p>{comment.text}</p>
                                </div>
                            ))}
                            <br/><br/><br/>
                            <form onSubmit={createComment} className='commentCreateBox'>
                                <h1>add comment</h1>

                                <input type="text"
                                       className='productAdd__textInput'
                                       required={true}
                                       placeholder='author'
                                       value={newComment.author}
                                       onChange={(event)=>{
                                           setNewComment({
                                               ...newComment,
                                               author: event.target.value
                                           })
                                       }}
                                />
                                <input type="text"
                                       required={true}
                                       className='productAdd__textInput'
                                       placeholder='text'
                                       value={newComment.text}
                                       onChange={(event)=>{
                                           setNewComment({
                                               ...newComment,
                                               text: event.target.value
                                           })
                                       }}
                                />
                                <button type='submit' className='productAdd__submitButton'>
                                    submit
                                </button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;
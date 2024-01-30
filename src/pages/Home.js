import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner'; // Import the Spinner component
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams(); // Removed the unused variable

    useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_API_URL + '/products?' + searchParams)
            .then(res => res.json())
            .then(res => {
                setProducts(res.products);
                setLoading(false);
            });
    }, [searchParams]);

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            {loading ? (
                <Spinner /> // Use the Spinner component for loading state
            ) : (
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}
        </Fragment>
    );
}

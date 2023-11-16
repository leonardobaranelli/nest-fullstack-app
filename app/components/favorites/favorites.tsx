import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetFavoritesQuery } from '@/redux/services/favorite';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


interface Property {
  userId: string;
  postId: string;
  images: string[];
  title: string;
  price: number;
}



function FavoriteCard() {
  const favoriteProperties = useAppSelector((state) => state.favorites.posts);

//   const { data: posts, isLoading, isError } =  useGetFavoritesQuery({ userId: 'c30e0fed-a0c0-4882-9495-356a6e82b0bd' });

  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const dispatch = useAppDispatch();

  const nextProperty = () => {
    setCurrentPropertyIndex((prevIndex) => (prevIndex + 1) % favoriteProperties.length);
  };

  const prevProperty = () => {
    setCurrentPropertyIndex((prevIndex) => (prevIndex - 1 + favoriteProperties.length) % favoriteProperties.length);
  };


  useEffect(() => {
    setCurrentPropertyIndex(0);
  }, [favoriteProperties]);

  console.log("lo de fav",favoriteProperties);

  return (
    <div className="bg-gray-100 p-4">
      {favoriteProperties && favoriteProperties.length > 0 ? (
        <div>

          <div className="flex flex-row space-x-4">
            {favoriteProperties.map((property, index) => (
              <div key={property.postId} className={`transition-transform transform ${index === currentPropertyIndex ? 'scale-100' : 'scale-90'}`}>
                <div className="grid grid-cols-3 gap-2">
                  {property?.images.length > 0 && ( 
                    <img
                      src={property.images[0]}  
                      className="rounded-md"
                      alt={`Property Image 0`} 
                    />
                  )}
                </div>
                <Link href={`/Views/${property.postId}`}>
                  <h1 className="text-xl font-bold text-blue-500 cursor-pointer hover:underline">{property.title}</h1>
                </Link>
                <p className="text-gray-700">Precio: ${property.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevProperty}
              disabled={favoriteProperties.length <= 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              PREV
            </button>
            <button
              onClick={nextProperty}
              disabled={favoriteProperties.length <= 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              NEXT
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No hay propiedades favoritas.</p>
      )}
    </div>
  );
}

export default FavoriteCard;


{/* <Link href={`/Views/${favoriteProperties[currentPropertyIndex]?.postId}`}>
<h1>{favoriteProperties[currentPropertyIndex]?.title}</h1>
</Link>
<p>Precio: ${favoriteProperties[currentPropertyIndex]?.price}</p>
<div className="property-images">
{/* {favoriteProperties[currentPropertyIndex]?.images.map((image, imageIndex) => ( */}
  {/* <img
    key={imageIndex}
    src={image}
    width={25}
    height={25}
    alt={`Property Image ${imageIndex}`}
    style={{ display: imageIndex === currentImageIndex ? 'block' : 'none' }}
  />
))} */} 
'use client';
import React from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {images.map((img, i) => (
                <div key={i} className="w-full h-40 sm:h-48 rounded overflow-hidden shadow">
                    <Image
                        src={img.src}
                        alt={img.alt}
                        width={400}
                        height={240}
                        className="object-cover w-full h-full"
                    />
                </div>
            ))}
        </div>
    );
}

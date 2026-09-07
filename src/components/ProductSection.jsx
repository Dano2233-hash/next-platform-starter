import React from 'react'
import { ProductCard } from './ProductCard'
import { SectionHeader } from './SectionHeader'

export function ProductSection({ title, subtitle, products, viewAllLink, icon }) {
  if (!products || products.length === 0) return null

  return (
    <section className="my-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllLink={viewAllLink}
        icon={icon}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

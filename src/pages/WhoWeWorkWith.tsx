import { whyEleraExistImage } from "@/assets/images"

const WhoWeWorkWith = () => {
  return (
    <main className="min-h-screen pt-40">
      <div className="container mx-auto px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Who we Work With
          <img
                          src={whyEleraExistImage }
                          alt="Why Elara Exists"
                          className="h-full w-full object-contain rounded-[62px]"
                          onLoad={() => console.log('Image loaded successfully:', whyEleraExistImage)}
                          onError={(e) => {
                            console.error('Image failed to load:', whyEleraExistImage)
                            console.error('Error target:', e.currentTarget)
                          }}
                          style={{ 
                            minHeight: '100%',
                            minWidth: '100%',
                            display: 'block'
                          }}
                        />
        </h1>
        <div className="prose prose-lg max-w-none text-white">
          {/* Content will be added based on Figma design */}
        </div>
      </div>
    </main>
  )
}

export default WhoWeWorkWith


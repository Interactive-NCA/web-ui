import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-10">
      <Head>

        <title>Interactive NCA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
        <div className="container mx-auto mx-10">
          <h1 className="text-3xl font-press-start">
            Interactive NCA
          </h1>
        </div>
      </main>
    </div>
  )
}

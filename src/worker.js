export default {
  async fetch(request, env, ctx) {
    // Url format for image is /img/search+query?orientation=landscape&content_filter=high
    // For author info, use /metadata/search+query?orientation=landscape&content_filter=high which returns JSON
    const url = new URL(request.url)
    // extract search query from url, remove params
    const search_query = url.pathname.split('/').pop().split('?')[0]
    // console.log('search_query', search_query)
    // pass params: orientation (default 'landscape'), content_filter (default 'high')
    const orientation = url.searchParams.get('orientation') || 'landscape'
    const content_filter = url.searchParams.get('content_filter') || 'high'
    const unsplash_search_url = `https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=${orientation}&content_filter=${content_filter}&query=${search_query}`
    const unsplash_search_response = await fetch(unsplash_search_url, {
      headers: {
        'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
      }
    })
    const unsplash_search_json = await unsplash_search_response.json()
    // console.log('unsplash_search_json', unsplash_search_json)
    if (url.pathname.startsWith('/img')) {
      const unsplash_image_url = unsplash_search_json.results[0].urls.regular
      return Response.redirect(unsplash_image_url, 302)
    } else if (url.pathname.startsWith('/metadata')) {
      return new Response(JSON.stringify(unsplash_search_json.results[0]), { headers: { 'content-type': 'application/json;charset=UTF-8' } })
    } else {
      return new Response('Not Found', { status: 404 })
    }
  },
};

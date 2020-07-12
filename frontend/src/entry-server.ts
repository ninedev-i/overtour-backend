import {createApp} from './app'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (context: any) => {
    return new Promise((resolve, reject) => {
        const s: any = isDev && Date.now()

        const { app, router, store } = createApp()

        const { url } = context

        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }
        // set router's location
        router.push(url)
        // wait until router has resolved possible async hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            // Call asyncData hooks on components matched by the route.
            // A asyncData hook dispatches a store action and returns a Promise,
            // which is resolved when the action is complete and store state has been
            // updated.
            Promise.all(matchedComponents.map((component: any) => component.options.asyncData ? component.options.asyncData({
                store,
                route: router.currentRoute
            }) : null)).then(() => {
                isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
                // Inject finally state
                context.state = store.state;
                resolve(app)
            }).catch(reject);
        }, reject)
    })
}

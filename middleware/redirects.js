export default function ({ route, redirect }) {
    if (route.path.startsWith('/category/')) {
        // Extract the 'anytext' part from the URL
        const path = route.path;

        // Redirect to category.vue with the extracted 'anytext' as a query parameter
        redirect('/category', { path });
    }
}

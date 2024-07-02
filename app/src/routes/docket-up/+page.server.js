import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private'
export const actions = {
    default: async ({ request }) => {
        


// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        const formData = await request.formData();
        const email = formData.get('email');
        const userName = formData.get('username');
        const password = formData.get('password');
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const country = formData.get('country');
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: "docket-"+userName,
                    first_name: firstName,
                    last_name: lastName,
                    country: country,
                }
            }
        })
        console.log(data);
        if (error) {
            console.error(error);
        }

        return { success: true,
                data: data
         };
    },
};
const supabase = require('../utils/auth');

// Signup User
exports.signupUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        // const { user, error } = await supabase.auth.signUp({
        //     email,
        //     password,
        // });

        // if (error) throw error;

        // const { data, insertError } = await supabase
        //     .from('user_profiles')
        //     .insert([
        //         { id: user.id, username: username, email: user.email, password:user.password, created_at: new Date() }
        //     ]);

        // if (insertError) throw insertError;

        // const { data, error } = await supabase.auth.admin.createUser({
        //     email: 'user@email.com',
        //     password: 'password',
        //     
        //   })

        const {data, error} = await supabase.auth.admin.createUser({
            email, password, user_metadata: { name: username }
        })

        if(error) throw error;

        const { user, error: signupError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signupError) throw signupError;        

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { session, error } = await supabase.auth.signIn({
            email,
            password
        });

        if (error) throw error;

        res.status(200).send(session);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

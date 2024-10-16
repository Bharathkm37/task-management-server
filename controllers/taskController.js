const supabase = require('../utils/supabaseClient');

exports.createTask = async (req, res) => {
    const { title, column, status, userId } = req.body;
    if (!title || !column) {
        return res.status(400).send({ error: 'Title and column are required.' });
    }

    try {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ title, column, status, userId }]);
        
        if (error) throw error;
        
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const {userId} = req.params;
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('userId', userId)
            
        
        if (error) throw error;
        
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, column, status } = req.body;

    try {
        const { data, error } = await supabase
            .from('tasks')
            .update({ title, column, status })
            .match({ id });
        
        if (error) throw error;
        
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .match({ id });
        
        if (error) throw error;
        
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

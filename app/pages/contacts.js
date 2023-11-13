import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Header from '../components/header';
import Footer from '../components/footer';
import Nav from '../components/navbar';

function Contacts() {
    const [contactsList, setContactsList] = useState([]);
    const [form, setForm] = useState({ firstname: '', lastname: '', email: '', message: '' });
    const supabaseClient = useSupabaseClient();
    const [submitStatus, setSubmitStatus] = useState({ success: false, error: false, message: '' });


    useEffect(() => {
        async function loadContacts() {
            const { data, error } = await supabaseClient
                .from('contacts')
                .select('*');
            if (error) {
                console.error('Erreur lors de la récupération des contacts:', error);
            } else {
                setContactsList(data);
            }
        console.log(data);}
        loadContacts();
        
    }, [supabaseClient]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitStatus({ success: false, error: false, message: '' }); // Réinitialiser le statut

        const { data, error } = await supabaseClient
            .from('contacts')
            .insert([
                { firstname: form.firstname, lastname: form.lastname, email: form.email, message: form.message }
            ]);
        if (error) {
            console.error('Erreur lors de l’ajout du contact:', error);
            setSubmitStatus({ success: false, error: true, message: 'Une erreur est survenue lors de l’ajout du contact.' });
        } else {
            // Assurez-vous que data est un tableau avant de l'utiliser dans setContactsList
            const newData = Array.isArray(data) ? data : [data];
            setContactsList([...contactsList, ...newData]);
            setForm({ firstname: '', lastname: '', email: '', message: '' });
            setSubmitStatus({ success: true, error: false, message: 'Contact ajouté avec succès!' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <>

            <Header />
            <Nav />
            <div className="container mx-auto px-4">
                

                <main className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
                    <div className="mb-6">
                        <p className="mb-2"><strong>Email:</strong> exemple@monblog.com</p>
                        <p><strong>Téléphone:</strong> +33 1 23 45 67 89</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Prénom :</label>
                            <input type="text" name="firstname" value={form.firstname} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Nom :</label>
                            <input type="text" name="lastname" value={form.lastname} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Email :</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Message :</label>
                            <textarea name="message" value={form.message} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Envoyer</button>
                    </form>
                    {submitStatus.message && (
                        <div className={`alert ${submitStatus.success ? 'success' : 'error'}`}>
                            {submitStatus.message}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
}

export default Contacts;

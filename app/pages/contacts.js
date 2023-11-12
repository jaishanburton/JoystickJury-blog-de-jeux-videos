import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Header from '../components/header';
import Footer from '../components/footer';
import Nav from '../components/navbar';

function Contacts() {
    const [contactsList, setContactsList] = useState([]);
    const [form, setForm] = useState({ firstname: '', lastname: '', email: '', message: '' });
    const supabaseClient = useSupabaseClient();

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
        const { data, error } = await supabaseClient
            .from('contacts')
            .insert([
                { firstname: form.firstname, lastname: form.lastname, email: form.email, message: form.message }
            ]);
        if (error) {
            console.error('Erreur lors de l’ajout du contact:', error);
        } else {
            setContactsList([...contactsList, ...data]);
            setForm({ firstname: '', lastname: '', email: '', message: '' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="container mx-auto px-4">
            <Header />
            <Nav />

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

                <h3 className="text-xl font-bold mb-2">Messages reçus :</h3>
                {contactsList.length > 0 ? (
                    contactsList.map((contact, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                            <p><strong>Prénom :</strong> {contact.firstname} </p>
                            <p><strong>Nom :</strong>{contact.lastname}</p>
            <p><strong>Email :</strong> {contact.email}</p>
            <p><strong>Message :</strong> {contact.message}</p>
        </div>
    ))
) : (
    <p>Aucun contact pour l'instant.</p>
)}
            </main>

            <Footer />
        </div>
    );
}

export default Contacts;

import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Header from '../components/header';
import Footer from '../components/footer';

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
        setSubmitStatus({ success: false, error: false, message: '' }); 
        const { data, error } = await supabaseClient
            .from('contacts')
            .insert([
                { firstname: form.firstname, lastname: form.lastname, email: form.email, message: form.message }
            ]);
        if (error) {
            console.error('Erreur lors de l’ajout du contact:', error);
            setSubmitStatus({ success: false, error: true, message: 'Une erreur est survenue lors de l’ajout du contact.' });
        } else {
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
        <div className="container mx-auto px-4">           

            <main className="mt-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contactez-nous</h2>

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Prénom :</label>
                        <input id="firstname" type="text" name="firstname" value={form.firstname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Nom :</label>
                        <input id="lastname" type="text" name="lastname" value={form.lastname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
                        <input id="email" type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message :</label>
                        <textarea id="message" name="message" value={form.message} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="recontact" className="block text-sm font-medium text-gray-700">Êtes-vou ?</label>
                        </div>
                    <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio h-5 w-5 text-green-600" name="gender" value="Yes" />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio h-5 w-5 text-red-600" name="gender" value="No" />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
                    <div className="mb-4">
                        <button type="submit" className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                            Envoyer
                        </button>
                    </div>
                </form>

                {submitStatus.message && (
                    <div className={`mt-6 text-center p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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

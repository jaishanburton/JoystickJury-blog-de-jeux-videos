import { createClient } from '@supabase/supabase-js'
import React from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

const ContactDetails = ({ contact }) => {
    if (!contact) {
        return <p>Contact non trouvé ou erreur de chargement.</p>;
    }

    return (
        <div>
            <h1>Détails du contact</h1>
            <p>Prénom : {contact.firstname}</p>
            <p>Nom : {contact.lastname}</p>
            <p>Email : {contact.email}</p>
            <p>Message : {contact.message}</p>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const { id } = context.params;

    let { data: contact, error } = await supabaseAdmin
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erreur lors de la récupération du contact', error);
        return { props: { contact: null } };
    }

    return { props: { contact } };
}

export default ContactDetails;

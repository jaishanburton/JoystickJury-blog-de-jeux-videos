import { createClient } from '@supabase/supabase-js'
import React from 'react'

// Initialisez Supabase client
const supabaseAdmin = createClient('http://localhost:8001', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q'
)

const ContactDetails = ({ contact }) => {
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
    const { id } = context.params

    let { data: contact, error } = await supabaseAdmin
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Erreur lors de la récupération du contact', error)
        return { props: { contact: null } }
    }

    return { props: { contact } }
}

export default ContactDetails

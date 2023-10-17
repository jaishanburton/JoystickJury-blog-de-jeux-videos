// pages/api/profile.js

export default (req, res) => {
    // Simulez une vérification d'authentification
    const userIsLoggedIn = true;

    if (userIsLoggedIn) {
        res.status(200).json({ username: "Mathys", email: "mathysbgh@gmail.com" });
    } else {
        res.status(401).json({ error: "Non autorisé" });
    }
};

router.get("/reservations", async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render("reservations", { reservations });
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

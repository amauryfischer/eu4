class Planet < ApplicationRecord
    def self.create_one
        Planet.create(
            resources: {
                Titane: 0,
                Azote: 0,
                Aluminium: 0,
                Cuivre: 0,
                Fer: 0,
                Uranium: 0,
                Hydrogène: 0,
                Silicium: 0,
            },
            resourcesMultiplicator: {
                Titane: 4,
                Azote: 7,
                Aluminium: 10,
                Cuivre: 10,
                Fer: 5,
                Uranium: 3,
                Hydrogène: 1,
                Silicium: 2,
            }
        )
    end
end
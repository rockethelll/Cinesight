import React from "react";

export default function About() {
  return (
    <main className="about__wrapper">
      <h2 className="my-2">Comment ça marche ?</h2>
      <div className="my-5">
        <p>
          <h3>
            Recherche de films
            <img src="../images/search-yellow.svg" alt="icone de recherche" />
          </h3>
          Utilisez notre fonction de recherche pour trouver des films
          spécifiques. Il vous suffit de saisir le titre du film dans la barre
          de recherche et nous vous fournirons les résultats correspondants. Que
          vous recherchiez un classique du cinéma ou les dernières sorties,
          notre base de données complète est là pour vous aider.
        </p>
      </div>
      <div className="my-5">
        <h3>
          Ajouter à votre watchlist
          <img
            src="../images/watchlist.svg"
            width={35}
            alt="icone de watchlist"
          />
        </h3>
        <p>
          Lorsque vous parcourez notre site et trouvez un film qui suscite votre
          intérêt, vous pouvez l'ajouter à votre "watchlist". Cela vous permet
          de garder une trace des films que vous souhaitez regarder à l'avenir.
          Il vous suffit de cliquer sur le bouton "Ajouter à ma watchlist" et le
          film sera enregistré dans votre compte.
        </p>
      </div>
      <div className="my-5">
        <h3>
          Parcourir les listes populaires{" "}
          <img src="../images/movies.svg" width={28} alt="icone de recherche" />
        </h3>
        <p>
          Explorez nos listes de films populaires pour découvrir ce qui fait
          vibrer la communauté cinéphile. Que ce soit les films les mieux notés,
          les plus récents, les classiques incontournables ou des sélections
          thématiques, nous avons rassemblé une variété de listes pour vous
          inspirer dans votre prochaine séance de cinéma.
        </p>
      </div>

      <div className="my-5">
        <p>
          <em>
            N'attendez plus, plongez dans l'univers du cinéma avec Cinesight et
            explorez une multitude de films captivants. Profitez de notre site
            et laissez-vous inspirer pour votre prochaine séance de cinéma !
          </em>
        </p>
      </div>
      <strong>L'équipe Cinesight</strong>
    </main>
  );
}

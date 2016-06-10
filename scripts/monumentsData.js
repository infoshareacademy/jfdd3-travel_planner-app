var objects = [];

   function createPoint(name, position, description, url) {
       var result = Object.create(null);

       result.name = name;
       result.position = position;
       result.description = description;
       result.url = url;

       objects.push(result);

   }
    createPoint('Fontanna Neptuna',[54.3486247,18.5830179],"Stojąca od 1633 r. przed Dworem Artusa Fontanna Neptuna jest symbolem Gdańska. Inicjatorem jej powstania był burmistrz Gdańska Bartłomiej Schachmann. Postać Neptuna nawiązuje do związków Gdańska z morzem. Wymodelowali ją Peter Husen i Johann Rogge, a odlana została w 1615 roku w Augsburgu. Autorem projektu całej fontanny był Abraham van den Blocke.","images/neptun.jpg");

    createPoint('Złota Kamienica',[54.348621,18.6516125],"Jest jednym z najpiękniejszych budynków gdańskich. Została wzniesiona dla burmistrza Jana Speymanna, bogatego kupca i światłego mecenasa sztuk oraz jego żony Judyty z Bahrów. Powstała przed 1609 r., według projektu Abrahama van den Blocke, który był także autorem części wystroju rzeźbiarskiego, ukończonego do 1618 r.", "images/zlotakamienica.jpg");

    createPoint('Dom Uphagena',[54.3493237,18.6471176],"Dom Uphagena stoi przy ul. Długiej 12 i jest jedyną w Gdańsku odtworzoną wraz ze swym wystrojem kamienicą mieszczańską. W końcu XV wieku wzniesiono w tym miejscu budynek murowany, którego relikty znajdują się w piwnicach obecnie istniejącej kamienicy. W następnych wiekach często zmieniali się właściciele posesji a dom uległ licznym przekształceniom. W roku 1775 zakupił go i przebudował Johann Uphagen, kupiec, historyk amator, bibliofil. Po śmierci właściciela kamienica pozostała w rękach rodziny i przetrwała w niemal niezmienionym stanie do początków XX wieku.","images/domuphagena.jpg");

    createPoint('Żuraw',[54.3501241,18.6578039],"To największy dźwig portowy średniowiecznej Europy, jedna z najbardziej charakterystycznych budowli Gdańska. Położony nad Motławą, służył do przeładunku towarów i stawiania masztów na statkach. Pełnił zarazem funkcję bramy miejskiej.", "images/zuraw.jpg");

    createPoint('Bazylika Mariacka',[54.3498379,18.6510907],"zwana koroną miasta Gdańska to Kościół Wniebowzięcia Najświętszej Marii Panny, największa ceglana, gotycka świątynia w Europie, powstawał 159 lat w kilku etapach w latach 1343-1502. We wnętrzu znajduje się wiele doskonałych dzieł sztuki średniowiecznej i barokowej, m.in. kamienna Pieta z ok. 1410 r., kopia Sądu Ostatecznego namalowanego przez Hansa Memlinga w roku 1472.", "images/bazylikamariacka.jpg");

    createPoint('Kaplica Królewska',[54.3503536,18.6515437],"Jedyna barokowa świątynia na gdańskim Głównym Mieście. Powstała z inicjatywy króla Jana III Sobieskiego jako tymczasowa kaplica katolicka dla wiernych z parafii Kościoła Mariackiego, który pozostawał w rękach protestantów. Jest dziełem gdańskiego budowniczego Barthela Ranischa. Powstała w latach 1678-1681, według projektów architekta królewskiego Tylmana z Gameren. Barokowe rzeźby fasady wykonał Andreas Schlüter Młodszy.", "images/kaplicakrolewska.jpg");

    createPoint('Wieża więzienna i katownia',[54.3498128,18.6452312],"Wieża Więzienna wraz z Katownią stanowią średniowieczny zespół przedbramia ulicy Długiej. Katownia przebudowana została w 1593 r. przez Flamanda, Antoniego van Obberghena, natomiast Wieża Więzienna podwyższona została do dzisiejszego stanu w latach 1508-1509 przez Michała Enkingera. Do czasu wzniesienia nowożytnych umocnień ziemnych w drugiej połowie XVI w.", "images/zlotakamienica.jpg");

    createPoint('Dwór Artusa',[54.348795,18.651187],"Przez wiele lat był jednym z najwspanialszych tego typu obiektów w Europie północnej. Dwory Artusa powstawały licznie w całej Europie a szczególnie w miastach hanzeatyckich, jako miejsca spotkań zamożnego patrycjatu, kupców i rzemieślników na wzór legendarnego Okrągłego Stołu rycerzy króla Artura. Gdański Dwór Artusa był ważnym ośrodkiem życia towarzyskiego i handlowego Gdańska i najbardziej demokratycznym miejscem w kraju. Bywali tam kasztelanowie, wojewodowie, następcy tronu.","images/dworartusa.img");

    createPoint('Ratusz Głównego Miasta',[54.3487931,18.650375],"Najokazalsza i najcenniejsza budowla świecka dawnego Gdańska, siedziba władz miasta. Budowany był od 1379 do 1492 roku. Hełm wieży o wysokości 80 m, stworzony przez mistrza Dirka Danielsa z Zelandii, wieńczy metalowy, złocony posąg króla Zygmunta Augusta. Trzy skrzydła obecnego dziedzińca ukończono w 1593-96 r. Pod koniec XVI wieku na jednym z narożników umieszczono zegar słoneczny z łacińską sentencją Cieniem są dni nasze. Doszczętnie wypalony w 1945 r. odbudowywany był do 1970 r.", "images/ratuszglownegomiasta.jpg");
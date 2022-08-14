const axios = require("axios");
const { parse } = require("node-html-parser");
const fs = require("fs");
const axiosRetry = require("axios-retry");
axiosRetry(axios, { retries: 3 });

const urls = [
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-mardi-1584394630",
    filename: "17mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-la-point-sur-la-situation-ce-mercredi-1584481229",
    filename: "18mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-jeudi-1584568992",
    filename: "19mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-vendredi-1584655909",
    filename: "20mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1584736644",
    filename: "21mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1584818273",
    filename: "22mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1584906205",
    filename: "23mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1584995188",
    filename: "24mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-mercredi-1585086120",
    filename: "25mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-jeudi-1585171761",
    filename: "26mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-vendredi-1585256609",
    filename: "27mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1585335978",
    filename: "28mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1585422155",
    filename: "29mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/covid-19-plusieurs-personnes-intoxiquees-a-la-chloroquine-en-nouvelle-aquitaine-1585542697",
    filename: "29mars2020_bis",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1585505938",
    filename: "30mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1585597048",
    filename: "31mars2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-1585682265",
    filename: "1avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-1585775656",
    filename: "2avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-vendredi-1585860157",
    filename: "3avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-1585942282",
    filename: "4 avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1586023989",
    filename: " 5avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1586111967",
    filename: "6avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1586200685",
    filename: "7avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-1586290382",
    filename: "8avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-2-2-1586347537",
    filename: "8avril2020_bis",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-jeudi-1-2-1586369833",
    filename: "9avril2020",
  },

  {
    url: "https://www.francebleu.fr/infos/sante-sciences/en-direct-coronavirus-le-point-sur-la-situation-ce-jeudi-2-2-1586434566",
    filename: "9avril2020_bis",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-vendredi-1-2-1586461359",
    filename: "10avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-vendredi-2-2-1586523617",
    filename: "10avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1586547667",
    filename: "11avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-2-2-1586606966",
    filename: "11avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1-2-1586631205",
    filename: "12avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-le-point-sur-le-situation-ce-dimanche-2-2-1586690766",
    filename: "12avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1586716019",
    filename: "13avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-2-2-1586780783",
    filename: "13avril_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1586807184",
    filename: "14avril2020",
  },

  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-2-2-1586865380",
    filename: "14avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-1-2-1586891056",
    filename: "15avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-2-2-1586953731",
    filename: "15avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/faits-divers-justice/deux-couples-du-pays-de-montbeliard-surpris-en-pleins-ebats-dans-des-voitures-malgre-le-confinement-1586686558",
    filename: "15avril2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-2-2-1587040302",
    filename: "16avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-vendredi-1-2-1587066678",
    filename: "17avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-nouvelle-conference-de-presse-d-edouard-philippe-et-olivier-veran-dimanche-1587126129",
    filename: "17avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1587151678",
    filename: "18avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-2-2-1587213958",
    filename: "18avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1-2-1587237036",
    filename: "19avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-2-2-1587301930",
    filename: "19avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1587326184",
    filename: "20avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-2-2-1587385697",
    filename: "20avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1587412139",
    filename: "21avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-2-2-1587471286",
    filename: "21avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-1-2-1587500372",
    filename: "22avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-plus-d-un-salarie-sur-deux-au-chomage-partiel-emmanuel-macron-attendu-en-bretagne-1587557597",
    filename: "22avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/une-carte-du-deconfinement-fait-reagir-en-mayenne-departement-qui-pourrait-ne-pas-etre-deconfine-le-1587542568?fbclid=IwAR3sUZZN55RMNSEX4I0IpwAzZ9ZoBqhQA-NxlslEYudx5aBz2vV_-xclVzY",
    filename: "22avril2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-jeudi-1-2-1587585623",
    filename: "23avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-1-2-1587672335",
    filename: "24avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-2-2-1587732011",
    filename: "24avril2020-1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-389-deces-supplementaires-en-une-journee-plus-de-122-500-cas-confirmes-en-france-1587748928",
    filename: "24avril2020-2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1587757647",
    filename: "25avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-2-2-1587817195",
    filename: "25avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-champion-de-judo-picard-cyril-boulanger-37-ans-est-decede-1586150644",
    filename: "25avril2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1-2-1587843849",
    filename: "26avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-2-2-1587904881",
    filename: "26avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/education/le-conseil-scientifique-recommande-le-port-du-masques-pour-les-collegiens-et-les-lyceens-1587869881",
    filename: "26avril2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1587925799",
    filename: "27avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-2-2-1587990624",
    filename: "27avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1588016084",
    filename: "28avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-2-2-1588076387",
    filename: "28avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-video-deconfinement-suivez-le-discours-d-edouard-philippe-a-l-assemblee-nationale-15h-1588067908",
    filename: "28avril2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-1-2-1588101241",
    filename: "29avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-2-2-1588162711",
    filename: "29avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-1-2-1588191899",
    filename: "30avril2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-2-2-1588249786",
    filename: "30avril2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-1-2-1588259496",
    filename: "1mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-la-carte-du-confinement-est-corrigee-218-morts-en-une-journee-1588356010",
    filename: "1mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1588358079",
    filename: "2mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-2-2-1588421264",
    filename: "2mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1-2-1588446684",
    filename: "3mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-2-2-1588504753",
    filename: "3mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1588531054",
    filename: "4mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-2-2-1588595210",
    filename: "4mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/economie-social/coronavirus-amazon-demande-le-chomage-partiel-l-administration-francaise-refuse-1588599133",
    filename: "4mai2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1588616223",
    filename: "5mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-2-2-1588681418",
    filename: "5mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-1-2-1588704172",
    filename: "6mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-2-2-1588767612",
    filename: "6mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-jeudi-1-2-1588790229",
    filename: "7mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/faits-divers-justice/direct-video-deconfinement-suivez-les-annonces-d-edouard-philippe-1588838174",
    filename: "7mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-1-2-1588881376",
    filename: "8mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-2-2-1588940761",
    filename: "8mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1588967457",
    filename: "9mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1589026091",
    filename: "9mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-dimanche-1-2-1589053023",
    filename: "10mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-10-mai-1589112440",
    filename: "10mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-deconfinement-le-point-sur-la-situation-ce-lundi-1-2-1589135845",
    filename: "11mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-deconfinement-coronavirus-le-point-sur-la-situation-ce-lundi-2-2-1589200742",
    filename: "11mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/societe/coronavirus-le-calendrier-du-deconfinement-1589191404",
    filename: "11mai2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1589223983",
    filename: "12mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-2-2-1589286948",
    filename: "12mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/societe/rennes-un-mysterieux-avion-survole-la-ville-de-nuit-1588960799",
    filename: "12mai2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-deconfinement-le-point-sur-la-situation-ce-mercredi-1-2-1589313204",
    filename: "13mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-2-2-1589371980",
    filename: "13mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-1-2-1589396271",
    filename: "14mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-deconfinement-le-point-sur-le-situation-ce-jeudi-2-2-1589459479",
    filename: "14mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/deconfinement-le-point-sur-la-situation-ce-vendredi-1-2-1589475543",
    filename: "15mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-2-2-1589545063",
    filename: "15mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1589569877",
    filename: "16mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-2-2-1589631785",
    filename: "16mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1-2-1589653284",
    filename: "17mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-2-2-1589719382",
    filename: "17mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1589742152",
    filename: "18mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-2-2-1589805147",
    filename: "18mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/economie-social/coronavirus-la-france-et-l-allemagne-proposent-un-plan-de-relance-de-500-milliards-d-euros-1589815279",
    filename: "18mai2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1589832147",
    filename: "19mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-2-2-1589890286",
    filename: "19mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-1-2-1589919246",
    filename: "20mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-2-2-1589977713",
    filename: "20mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-1-2-1590003418",
    filename: "21mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-2-2-1590063302",
    filename: "21mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-1-2-1590083622",
    filename: "22mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-vendredi-2-2-1590150747",
    filename: "22mai_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1590177161",
    filename: "23mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-2-2-1590236532",
    filename: "23mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1-2-1590259203",
    filename: "24mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-2-2-1590323470",
    filename: "24mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1590347591",
    filename: "25mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-2-2-1590409650",
    filename: "25mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/politique/coronavirus-francois-hollande-reconnait-une-part-de-responsabilite-dans-la-situation-de-l-hopital-1590402786",
    filename: "25mai2020_2",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1590438727",
    filename: "26mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-mercredi-1-2-1590524045",
    filename: "27mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mercredi-2-2-1590582297",
    filename: "27mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-jeudi-1-2-1590606949",
    filename: "28mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-jeudi-2-2-1590668751",
    filename: "28mai2020_1",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/coronavirus-le-point-sur-la-situation-ce-vendredi-1-2-1590695248",
    filename: "29mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-samedi-1-2-1590783943",
    filename: "30mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-dimanche-1590863998",
    filename: "31mai2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1591014191",
    filename: "1juin2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-lundi-1-2-1590950205",
    filename: "1juin2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-1-2-1591038279",
    filename: "2juin2020",
  },
  {
    url: "https://www.francebleu.fr/infos/sante-sciences/direct-coronavirus-le-point-sur-la-situation-ce-mardi-2-2-1591100116",
    filename: "2juin2020",
  },
  {
    url: "https://www.francebleu.fr/infos/societe/coronavirus-le-parquet-de-paris-ouvre-une-vaste-enquete-sur-la-gestion-critiquee-de-la-crise-1591706086",
    filename: "8juin2020",
  },
  {
    url: "https://www.francebleu.fr/infos/international/rebond-du-coronavirus-en-chine-plus-d-un-millier-de-vols-annules-aux-aeroports-de-pekin-1592374173",
    filename: "17juin2020",
  },
  {
    url: "https://www.francebleu.fr/infos/international/coronavirus-la-chine-construit-un-enorme-centre-de-quarantaine-1611122612",
    filename: "20fevrier2021",
  },
  {
    url: "https://www.francebleu.fr/infos/societe/direct-video-coronavirus-suivez-l-allocution-d-emmanuel-macron-20h-1617181937",
    filename: "31mars2021",
  },
];
function scrap(url, filename) {
  axios.get(url).then((response) => {
    console.log("scrapping", filename);
    const root = parse(response.data);
    const writableStream = fs.createWriteStream(`${filename}.html`);
    const item = root.querySelector("style").toString(); //root.querySelector(".bloc-contenu-main").toString();

    writableStream.write(item);
    writableStream.end();
  });
}

for (const item of urls) {
  scrap(item.url, item.filename);
}

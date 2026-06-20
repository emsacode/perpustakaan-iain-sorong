import os
import re
import urllib.request
import json
import time

# Create output directories if they don't exist
logo_dir = "/Users/iwan/Documents/Aplikasi/Perpustakaan_IAIN_Sorong/astro-web/public/images/db-logos"
data_dir = "/Users/iwan/Documents/Aplikasi/Perpustakaan_IAIN_Sorong/astro-web/public/data"

os.makedirs(logo_dir, exist_ok=True)
os.makedirs(data_dir, exist_ok=True)

# List of databases with names, descriptions, logo URLs, and official websites
databases = [
    {
        "no": 1,
        "name": "Cambridge Core",
        "desc": "Platform for Cambridge University Press's academic content, bringing together book and journal content.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/cambridge_core_icon.png",
        "link": "https://www.cambridge.org/core"
    },
    {
        "no": 2,
        "name": "EBSCOhost",
        "desc": "Database aggregator including Academic Search Complete (multidisciplinary) and Business Source Complete (business & economics).",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/06/ebscohost-logo-high-res.png",
        "link": "https://search.ebscohost.com"
    },
    {
        "no": 3,
        "name": "Emerald Insight",
        "desc": "Full Collection with 309 journals and over 249,000 articles across 13 subjects including Management, Engineering & Information.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/12/logo_emerald.png",
        "link": "https://www.emerald.com/insight"
    },
    {
        "no": 4,
        "name": "Nature",
        "desc": "Leading weekly international scientific journal, providing access to Nature Research publications.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2022/12/logo_nature_htm.png",
        "link": "https://www.nature.com"
    },
    {
        "no": 5,
        "name": "Nature Complete",
        "desc": "Access to 96 Nature journals (except 2023 new titles) with full text from 2007 to present.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/01/logo_nature_complete.png",
        "link": "https://www.nature.com"
    },
    {
        "no": 6,
        "name": "Oxford Academic",
        "desc": "Oxford Journals Collection covering Medicine, Life Sciences, Humanities, Law, Mathematics, Physical Sciences, and Social Sciences.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2022/01/oxford_acad_icon.jpg",
        "link": "https://academic.oup.com"
    },
    {
        "no": 7,
        "name": "ProQuest",
        "desc": "Access to newspapers, dissertations, academic journals, TV/radio broadcasts, company reports, books, and government documents.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/proquest_icon.png",
        "link": "https://www.proquest.com"
    },
    {
        "no": 8,
        "name": "SAGE Journals",
        "desc": "Over 700 journals spanning Humanities, Social Sciences, and Science, Technology, and Medicine.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/09/logo_sage_jour.png",
        "link": "https://journals.sagepub.com"
    },
    {
        "no": 9,
        "name": "SAGE Research Methods",
        "desc": "Comprehensive methodology content with 1,000+ books, case studies, datasets, videos, and Methods Map tool.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/06/logo_sage_rm.png",
        "link": "https://methods.sagepub.com"
    },
    {
        "no": 10,
        "name": "ScienceDirect",
        "desc": "Database from Elsevier with Freedom Collection package containing ~2,233 journal titles with fulltext from 2004 to present.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/logo_sciencedirect.png",
        "link": "https://www.sciencedirect.com"
    },
    {
        "no": 11,
        "name": "SciVal",
        "desc": "Research performance visualization tool for benchmarking, strategic partnerships, and trend analysis.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/01/logo_scival.jpg",
        "link": "https://www.scival.com"
    },
    {
        "no": 12,
        "name": "Scopus",
        "desc": "Navigation database with abstracts and citations from peer-reviewed literature for tracking institutional research productivity.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/scopus1_icon.png",
        "link": "https://www.scopus.com"
    },
    {
        "no": 13,
        "name": "Springerlink",
        "desc": "Covers Biomedical Sciences, Business, Chemistry, Computer Science, Earth Sciences, Economics, Engineering, Environmental Sciences, Life Sciences, Mathematics, Medicine, Physics, Psychology, Social Sciences, and Statistics.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/11/springernature_stack_icon.jpg",
        "link": "https://link.springer.com"
    },
    {
        "no": 14,
        "name": "Statista",
        "desc": "Market data from 22,500+ sources including government institutions, international organizations, and trade journals.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2022/10/statista_icon.png",
        "link": "https://www.statista.com"
    },
    {
        "no": 15,
        "name": "BJOG",
        "desc": "International Journal of Obstetrics and Gynaecology, publishing peer-reviewed work in all areas of women's health.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/bjog1_icon.png",
        "link": "https://obgyn.onlinelibrary.wiley.com/journal/14710528"
    },
    {
        "no": 16,
        "name": "The BMJ",
        "desc": "International peer-reviewed medical journal with continuous publication model, featuring original research, education, news, and comment articles.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/logo_bmj_rev1.png",
        "link": "https://www.bmj.com"
    },
    {
        "no": 17,
        "name": "Cochrane Library",
        "desc": "Collection of six databases containing high-quality, independent evidence to inform healthcare decision-making.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/cochrane2_icon.png",
        "link": "https://www.cochranelibrary.com"
    },
    {
        "no": 18,
        "name": "Immunological Reviews",
        "desc": "Each volume devoted to a single topic of immunological research, covering advances in basic immunology and clinical applications.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/immun_rev1_icon.png",
        "link": "https://onlinelibrary.wiley.com/journal/1600065x"
    },
    {
        "no": 19,
        "name": "Journal of Clinical Periodontology",
        "desc": "Official publication of the European Federation of Periodontology covering physiology, pathology, diagnosis, epidemiology, and therapy of periodontal disease.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/j._clin._periodontol._iconv2.jpg",
        "link": "https://onlinelibrary.wiley.com/journal/1600051x"
    },
    {
        "no": 20,
        "name": "Journal of Internal Medicine (JIM)",
        "desc": "Publishes original clinical work in general and internal medicine and its sub-specialties with original articles, reviews, and case reports.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/joim2_icon.png",
        "link": "https://onlinelibrary.wiley.com/journal/13652796"
    },
    {
        "no": 21,
        "name": "Periodontology 2000",
        "desc": "Series of monographs for periodontists and general practitioners, with three monographs published each year.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/periodontology_2000_icon.jpg",
        "link": "https://onlinelibrary.wiley.com/journal/16000757"
    },
    {
        "no": 22,
        "name": "ACSESS Digital Library",
        "desc": "Complete collection of all content published by American Society of Agronomy, Crop Science Society of America, and Soil Science Society of America.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/acsessdl_icon.png",
        "link": "https://dl.sciencesocieties.org"
    },
    {
        "no": 23,
        "name": "American Journal of Agricultural Economics",
        "desc": "Forum for creative and scholarly work on economics of agriculture, food, natural resources, environment, and rural community development.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/ajoae_icon.png",
        "link": "https://academic.oup.com/ajae"
    },
    {
        "no": 24,
        "name": "American Journal of Primatology",
        "desc": "Official journal of the American Society of Primatologists, published monthly with archival access from 1996-2020.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/11/ajop_icon.jpg",
        "link": "https://onlinelibrary.wiley.com/journal/10982345"
    },
    {
        "no": 25,
        "name": "Taylor & Francis Biological, Earth, Environmental & Food Sciences",
        "desc": "Over 40 journals covering Biological, Earth, Environmental & Food Sciences, with 114 journals listed in Web of Science.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/tnf_bio_icon.png",
        "link": "https://www.tandfonline.com"
    },
    {
        "no": 26,
        "name": "Journal of Agronomy and Crop Science",
        "desc": "Publishes original papers, short communications, and reviews on abiotic plant stress including drought, salinity, temperature extremes, and flooding.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/11/jagrocropsci_icon.jpg",
        "link": "https://onlinelibrary.wiley.com/journal/1439037x"
    },
    {
        "no": 27,
        "name": "Journal of Food Science",
        "desc": "Peer-reviewed publication serving as an international forum for vital research and developments in food science.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/j._food_sci._icon.jpg",
        "link": "https://onlinelibrary.wiley.com/journal/17503841"
    },
    {
        "no": 28,
        "name": "Accounting and Business Research",
        "desc": "Publishes papers containing substantial and original contribution to knowledge in accounting, corporate governance, auditing, and taxation.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/aabr_icon.png",
        "link": "https://www.tandfonline.com/toc/rabr20/current"
    },
    {
        "no": 29,
        "name": "Bulletin of Indonesian Economic Studies (BIES)",
        "desc": "Refereed journal since 1965 providing research on the Indonesian economy with comprehensive 'Survey of recent developments'.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/bies_icon.png",
        "link": "https://www.tandfonline.com/toc/cbie20/current"
    },
    {
        "no": 30,
        "name": "Economic Development and Cultural Change",
        "desc": "Studies using modern theoretical and empirical approaches examining determinants and effects of economic development and cultural change.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/edcc1_icon.png",
        "link": "https://www.journals.uchicago.edu/toc/edcc/current"
    },
    {
        "no": 31,
        "name": "European Journal of Work and Organizational Psychology",
        "desc": "High-quality scientific articles improving understanding of phenomena in work and organizational settings.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/ejowop1_icon.png",
        "link": "https://www.tandfonline.com/toc/pewo20/current"
    },
    {
        "no": 32,
        "name": "Financial Accountability & Management",
        "desc": "International academic journal on financial accountability, accounting, and financial/resource management of governmental and non-profit organizations.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2020/02/financial_acc_man_icon.jpg",
        "link": "https://onlinelibrary.wiley.com/journal/14680408"
    },
    {
        "no": 33,
        "name": "HeinOnline",
        "desc": "Premier online research platform with 197+ million pages of multidisciplinary periodicals, government documents, international resources, and case law.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/11/heinonline_icon.jpg",
        "link": "https://heinonline.org"
    },
    {
        "no": 34,
        "name": "Journal of Environmental Economics and Management",
        "desc": "Publishes theoretical and empirical papers on natural resource and environmental issues, linking economic systems with environmental systems.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/jeem1_icon.png",
        "link": "https://www.sciencedirect.com/journal/journal-of-environmental-economics-and-management"
    },
    {
        "no": 35,
        "name": "The Journal of Finance",
        "desc": "Most widely cited academic journal on finance, official publication of The American Finance Association, published six times a year.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/jof1_icon.png",
        "link": "https://onlinelibrary.wiley.com/journal/15406261"
    },
    {
        "no": 36,
        "name": "Journal of Gender Studies",
        "desc": "Interdisciplinary journal publishing articles on gender and sex from a feminist perspective covering Social, Natural and Health Sciences, Arts, Humanities, and Literature.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/11/jgenders_icon.jpg",
        "link": "https://www.tandfonline.com/toc/cjgs20/current"
    },
    {
        "no": 37,
        "name": "Journal of Health Economics",
        "desc": "Articles on economics of health and medical care including production of health, demand/utilization, financing, measurement, and behavioral models.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/12/logo_j_health_econ.jpg",
        "link": "https://www.sciencedirect.com/journal/journal-of-health-economics"
    },
    {
        "no": 38,
        "name": "Journal of Public Economics",
        "desc": "Encourages original scientific contributions on public economics with emphasis on modern economic theory and quantitative analysis.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/11/jopubecon_icon.jpg",
        "link": "https://www.sciencedirect.com/journal/journal-of-public-economics"
    },
    {
        "no": 39,
        "name": "Journal of Urban Economics",
        "desc": "Focal point for publication of research papers in urban economics, welcoming theoretical, empirical, positive, and normative papers.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/jue1_icon.png",
        "link": "https://www.sciencedirect.com/journal/journal-of-urban-economics"
    },
    {
        "no": 40,
        "name": "Globethics.net",
        "desc": "Global network of individuals and institutions interested in applied ethics, offering access to digital ethics library and collaborative research.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/12/logo_globethics.jpg",
        "link": "https://www.globethics.net"
    },
    {
        "no": 41,
        "name": "IMF eLibrary",
        "desc": "Access to International Financial Statistics, Direction of Trade, Balance of Payments, and Government Finance Statistics data.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/12/logo_imf_elibrary.jpg",
        "link": "https://www.elibrary.imf.org"
    },
    {
        "no": 42,
        "name": "The International Journal of Human Resource Management",
        "desc": "Forum for HRM scholars and professionals focusing on future trends in strategic human resource management in a global environment.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/ijohrm1_icon.png",
        "link": "https://www.tandfonline.com/toc/rijh20/current"
    },
    {
        "no": 43,
        "name": "JSTOR",
        "desc": "Multidisciplinary database with over 2,000 academic journals in humanities, social sciences, and sciences, plus monographs.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/12/logo_jstor.jpg",
        "link": "https://www.jstor.org"
    },
    {
        "no": 44,
        "name": "Multivariate Behavioral Research (MBR)",
        "desc": "Publishes substantive, methodological, and theoretical articles in all areas of social and behavioral sciences.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/mbr2_icon.png",
        "link": "https://www.tandfonline.com/toc/hmbr20/current"
    },
    {
        "no": 45,
        "name": "Osiris",
        "desc": "Information on listed and major unlisted/delisted companies around the world with detailed financial reports.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/osiris_icon.png",
        "link": "https://www.bvdinfo.com"
    },
    {
        "no": 46,
        "name": "Taylor & Francis Social Sciences & Humanities Library",
        "desc": "Access to over 1,450 journals spanning Anthropology, Arts, Business, Criminology, Education, Geography, Law, Media, Politics, Psychology, Sociology, and more.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2020/02/tnf_soc_human_icon.jpg",
        "link": "https://www.tandfonline.com"
    },
    {
        "no": 47,
        "name": "World Bank Economic Review",
        "desc": "Specializes in quantitative development policy analysis with articles examining policy choices in economic development.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/wber_icon.png",
        "link": "https://academic.oup.com/wber"
    },
    {
        "no": 48,
        "name": "American Chemical Society (ACS)",
        "desc": "Leading publisher of peer-reviewed research journals in chemical and related sciences.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/acs_icon.png",
        "link": "https://pubs.acs.org"
    },
    {
        "no": 49,
        "name": "American Institute of Physics (AIP)",
        "desc": "Collection of journals in physics and astronomy through Scitation platform.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/09/logo_aip_baru.png",
        "link": "https://pubs.aip.org"
    },
    {
        "no": 50,
        "name": "APS Journals",
        "desc": "Journals from the American Physical Society embodying the mission to advance and diffuse knowledge of Physics.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/08/aps_logo.png",
        "link": "https://journals.aps.org"
    },
    {
        "no": 51,
        "name": "ASME Digital Collection",
        "desc": "Repository of ASME Transaction Journals (1960-present), Conference Proceedings (2002-present), and ASME Press eBooks.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/asme_icon.jpg",
        "link": "https://asmedigitalcollection.asme.org"
    },
    {
        "no": 52,
        "name": "IEEEXplore",
        "desc": "Database in computer science and electrical engineering from IEEE and partners, including IEEE Electronic Library and eBook collections.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/12/logo_ieee_xplore.png",
        "link": "https://ieeexplore.ieee.org"
    },
    {
        "no": 53,
        "name": "Journal of Pharmaceutical Sciences",
        "desc": "Publishes research on basic pharmaceutical science including chemical processing, pharmacokinetics, biopharmaceutics, pharmacodynamics, and drug delivery.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/jps_icon.png",
        "link": "https://www.jpharmsci.org"
    },
    {
        "no": 54,
        "name": "AMA (American Management Association)",
        "desc": "eBooks collection in management published by Amacom.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/amacom_icon.png",
        "link": "https://www.amanet.org"
    },
    {
        "no": 55,
        "name": "Bloomsbury Collections",
        "desc": "Nearly 11,000 eBooks across humanities and social sciences featuring content from Bloomsbury's research publications.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2022/02/icon_bloomsbury.jpg",
        "link": "https://www.bloomsburycollections.com"
    },
    {
        "no": 56,
        "name": "Cambridge Core (E-books)",
        "desc": "Cambridge University Press's academic content platform with book and journal content.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/cambridge_core_icon.png",
        "link": "https://www.cambridge.org/core"
    },
    {
        "no": 57,
        "name": "Ebsco Dentistry & Oral Sciences Source",
        "desc": "Full-text collection of dental and oral sciences journals and monographs with cover-to-cover indexing and abstracts.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/ebsco_dos_icon.png",
        "link": "https://www.ebsco.com"
    },
    {
        "no": 58,
        "name": "Ebsco eBooks",
        "desc": "Multidisciplinary eBook collection from EBSCO with perpetual access.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/06/ebsco-ebooks-logo-high-res.png",
        "link": "https://www.ebsco.com/products/ebooks"
    },
    {
        "no": 59,
        "name": "Emerald Publishing",
        "desc": "Over 3,600 eBooks with content covering topics that resonate with real-world challenges across business, management, and social sciences.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2022/11/emerald_icon.png",
        "link": "https://www.emeraldgrouppublishing.com"
    },
    {
        "no": 60,
        "name": "GLOBAL Professional Publishing",
        "desc": "Multidisciplinary eBook collection.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/gpp_icon.png",
        "link": "https://www.globalprofessionalpublishing.com"
    },
    {
        "no": 61,
        "name": "KITLV",
        "desc": "Books and publications from Koninklijk Instituut voor Taal-, Land- en Volkenkunde focusing on Southeast Asia, Pacific, and Caribbean studies.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/kitlv_icon.png",
        "link": "https://www.kitlv.nl"
    },
    {
        "no": 62,
        "name": "ProQuest Ebook Central",
        "desc": "1.8+ million eBooks from 1,300+ leading publishers covering all academic disciplines.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2022/02/icon_pq_ebook.jpg",
        "link": "https://ebookcentral.proquest.com"
    },
    {
        "no": 63,
        "name": "Sidila",
        "desc": "Multidisciplinary eBooks from various publishers including Gadjah Mada University Press, accessible via web or Android app.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2025/06/sidila_icon.png",
        "link": "https://sidila.ugm.ac.id"
    },
    {
        "no": 64,
        "name": "Springer eBook Collection",
        "desc": "Perpetual access to Springer eBooks in various subjects with full-text download available.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/springer_ebook_icon.png",
        "link": "https://link.springer.com"
    },
    {
        "no": 65,
        "name": "Taylor & Francis E-books",
        "desc": "Over 50,000 eBooks across teaching syllabus and research topics, organized into eCollections.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2025/12/tandf_ebook2_icon.jpg",
        "link": "https://www.taylorfrancis.com"
    },
    {
        "no": 66,
        "name": "University Press Scholarship Online (UPSO)",
        "desc": "Public Health and Epidemiology collection from Oxford University Press.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2021/07/upso_icon.png",
        "link": "https://oxford.universitypressscholarship.com"
    },
    {
        "no": 67,
        "name": "Wiley Online Library",
        "desc": "eBooks in Agriculture, Architecture, Economics, Chemistry, Computer Science, Law, and Social Sciences.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2024/11/wiley_ol_icon.png",
        "link": "https://onlinelibrary.wiley.com"
    },
    {
        "no": 68,
        "name": "Repositori Ilmiah Nasional (RIN)",
        "desc": "National research data management platform managed by BRIN for research data and outputs.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2023/05/rin-lipi.png",
        "link": "https://rin.brin.go.id"
    },
    {
        "no": 69,
        "name": "Indonesia OneSearch",
        "desc": "Single search portal for all public collections from libraries, museums, and archives across Indonesia with international e-resources access.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2022/04/logo_ios.jpg",
        "link": "https://onesearch.id"
    },
    {
        "no": 70,
        "name": "e-Resources PNRI",
        "desc": "Digital library resources subscribed by the National Library of Indonesia including journals, eBooks, and online reference works.",
        "logo_url": "https://lib.ugm.ac.id/wp-content/uploads/sites/44/2018/07/logo_pusnas.jpg",
        "link": "https://e-resources.perpusnas.go.id"
    }
]

# Helper to clean filename
def get_clean_filename(name, url):
    ext = ".png"
    if url.lower().endswith(".jpg") or url.lower().endswith(".jpeg"):
        ext = ".jpg"
    elif url.lower().endswith(".png"):
        ext = ".png"
    elif url.lower().endswith(".gif"):
        ext = ".gif"
    
    # lowercase, replace spaces/special chars with underscores
    clean_name = re.sub(r'[^a-zA-Z0-9]', '_', name.lower())
    clean_name = re.sub(r'_+', '_', clean_name).strip('_')
    return f"{clean_name}{ext}"

# Download logos and prepare final data
final_databases = []
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print(f"Starting download of {len(databases)} logos...")

for item in databases:
    filename = get_clean_filename(item["name"], item["logo_url"])
    local_path = os.path.join(logo_dir, filename)
    relative_path = f"/images/db-logos/{filename}"
    
    print(f"Downloading logo for {item['name']}...")
    
    success = False
    for attempt in range(3): # retry 3 times
        try:
            req = urllib.request.Request(item["logo_url"], headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response:
                with open(local_path, 'wb') as f:
                    f.write(response.read())
            success = True
            print(f" -> Saved to {relative_path}")
            break
        except Exception as e:
            print(f" -> Attempt {attempt+1} failed: {e}")
            time.sleep(1)
            
    if not success:
        # Fallback to local default logo or keep as is if failed
        print(f" -> ERROR: Failed to download {item['name']} logo after 3 attempts.")
        relative_path = "/images/db-logos/default_database_icon.png"
        
    # Classify category dynamically
    no = item["no"]
    category = "Database & E-Journal"
    if 15 <= no <= 21:
        category = "Jurnal Spesifik"
    elif 22 <= no <= 27:
        category = "Pertanian & Pangan"
    elif 28 <= no <= 39:
        category = "Sosial & Ekonomi"
    elif 40 <= no <= 47:
        category = "Humaniora & Multidisiplin"
    elif 48 <= no <= 53:
        category = "Sains & Teknologi"
    elif 54 <= no <= 67:
        category = "E-Book Collection"
    elif 68 <= no <= 70:
        category = "Portal Nasional"
        
    final_databases.append({
        "no": item["no"],
        "name": item["name"],
        "desc": item["desc"],
        "logo": relative_path,
        "link": item["link"],
        "category": category
    })

# Save JSON file
json_path = os.path.join(data_dir, "ugm_db_2026.json")
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(final_databases, f, ensure_ascii=False, indent=2)

print("Done! JSON database saved to:", json_path)

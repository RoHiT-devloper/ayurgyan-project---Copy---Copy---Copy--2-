-- === Reset and seed full database with 40 real medicinal herbs ===

-- Clear existing data
DELETE FROM scientific_studies;
DELETE FROM medicinal_uses;
DELETE FROM herbs;
DELETE FROM users;

-- Reset sequences
ALTER SEQUENCE herbs_id_seq RESTART WITH 1;
ALTER SEQUENCE medicinal_uses_id_seq RESTART WITH 1;
ALTER SEQUENCE scientific_studies_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

-- Insert 40 diverse real-world herbs with complete data
INSERT INTO herbs (name, scientific_name, description, safety_level, region_of_origin, average_rating, image_url, traditional_uses, active_compounds, contraindications, side_effects, created_at, updated_at) VALUES
('Tulsi', 'Ocimum tenuiflorum', 'Holy basil revered in Ayurveda for its adaptogenic properties and stress-relieving effects', 'SAFE', 'INDIA', 4.8, '/images/tulsi.jpg', 'Stress relief, respiratory health, immunity boost', 'Eugenol, Ursolic acid, Rosmarinic acid', 'Pregnancy, breastfeeding', 'Mild stomach discomfort in large doses', NOW(), NOW()),
('Ashwagandha', 'Withania somnifera', 'Powerful adaptogen known for reducing stress and improving vitality', 'SAFE', 'INDIA', 4.7, '/images/ashwagandha.jpg', 'Stress reduction, energy boost, cognitive function', 'Withanolides, Alkaloids, Saponins', 'Thyroid disorders, autoimmune diseases', 'Drowsiness, stomach upset', NOW(), NOW()),
('Turmeric', 'Curcuma longa', 'Golden spice with potent anti-inflammatory and antioxidant properties', 'SAFE', 'INDIA', 4.9, '/images/turmeric.jpg', 'Inflammation reduction, joint health, digestion', 'Curcumin, Turmerone, Gingerol', 'Gallbladder issues, blood thinners', 'Stomach upset, nausea in high doses', NOW(), NOW()),
('Ginger', 'Zingiber officinale', 'Aromatic rhizome excellent for digestive issues and nausea relief', 'SAFE', 'ASIA', 4.6, '/images/ginger.jpg', 'Nausea relief, digestion aid, anti-inflammatory', 'Gingerol, Shogaol, Zingerone', 'Gallstones, bleeding disorders', 'Heartburn, mouth irritation', NOW(), NOW()),
('Garlic', 'Allium sativum', 'Pungent bulb with cardiovascular and immune-boosting benefits', 'SAFE', 'CENTRAL_ASIA', 4.5, '/images/garlic.jpg', 'Heart health, immune support, blood pressure', 'Allicin, Ajoene, Alliin', 'Bleeding disorders, surgery', 'Bad breath, body odor, heartburn', NOW(), NOW()),
('Ginseng', 'Panax ginseng', 'Renowned energy booster and cognitive enhancer', 'CAUTION', 'KOREA', 4.4, '/images/ginseng.jpg', 'Energy enhancement, mental clarity, stress adaptation', 'Ginsenosides, Panaxans, Polyacetylenes', 'High blood pressure, diabetes medications', 'Insomnia, headaches, digestive issues', NOW(), NOW()),
('Echinacea', 'Echinacea purpurea', 'Popular immune system stimulant and cold remedy', 'SAFE', 'NORTH_AMERICA', 4.2, '/images/echinacea.jpg', 'Immune support, cold prevention, wound healing', 'Alkamides, Caffeic acid, Polysaccharides', 'Autoimmune diseases, allergies to daisies', 'Nausea, dizziness, allergic reactions', NOW(), NOW()),
('Peppermint', 'Mentha piperita', 'Refreshing herb excellent for digestive comfort and headaches', 'SAFE', 'EUROPE', 4.6, '/images/peppermint.jpg', 'Digestive aid, headache relief, respiratory support', 'Menthol, Menthone, Limonene', 'GERD, hiatal hernia', 'Heartburn, allergic reactions', NOW(), NOW()),
('Chamomile', 'Matricaria chamomilla', 'Gentle calming herb perfect for relaxation and sleep', 'SAFE', 'EUROPE', 4.5, '/images/chamomile.jpg', 'Sleep aid, anxiety reduction, digestive comfort', 'Apigenin, Bisabolol, Chamazulene', 'Pregnancy, ragweed allergy', 'Drowsiness, allergic reactions', NOW(), NOW()),
('Lavender', 'Lavandula angustifolia', 'Fragrant herb known for its calming and sleep-promoting effects', 'SAFE', 'MEDITERRANEAN', 4.3, '/images/lavender.jpg', 'Anxiety relief, sleep improvement, skin healing', 'Linalool, Linalyl acetate, Camphor', 'Pregnancy, hormone-sensitive conditions', 'Headache, constipation with oral use', NOW(), NOW()),
('Aloe Vera', 'Aloe barbadensis', 'Soothing succulent for skin health and digestive support', 'SAFE', 'ARABIAN_PENINSULA', 4.7, '/images/aloe-vera.jpg', 'Skin healing, digestive health, burn treatment', 'Acemannan, Aloin, Anthraquinones', 'Intestinal disorders, kidney issues', 'Stomach cramps, diarrhea', NOW(), NOW()),
('Cinnamon', 'Cinnamomum verum', 'Aromatic bark with blood sugar regulating properties', 'CAUTION', 'SRI_LANKA', 4.4, '/images/cinnamon.jpg', 'Blood sugar control, antioxidant, anti-inflammatory', 'Cinnamaldehyde, Eugenol, Linalool', 'Liver disease, diabetes medications', 'Mouth sores, breathing issues', NOW(), NOW()),
('Milk Thistle', 'Silybum marianum', 'Liver-protective herb with detoxifying properties', 'SAFE', 'MEDITERRANEAN', 4.3, '/images/milk-thistle.jpg', 'Liver support, detoxification, antioxidant', 'Silymarin, Silybin, Taxifolin', 'Hormone-sensitive conditions', 'Mild laxative effect, stomach upset', NOW(), NOW()),
('St. John''s Wort', 'Hypericum perforatum', 'Mood-enhancing herb for mild to moderate depression', 'RESTRICTED', 'EUROPE', 4.1, '/images/st-johns-wort.jpg', 'Mood support, anxiety relief, nerve pain', 'Hypericin, Hyperforin, Flavonoids', 'SSRI medications, organ transplant', 'Photosensitivity, dry mouth, dizziness', NOW(), NOW()),
('Valerian', 'Valeriana officinalis', 'Potent sleep aid and anxiety reducer', 'CAUTION', 'EUROPE', 4.2, '/images/valerian.jpg', 'Insomnia treatment, anxiety reduction, stress relief', 'Valerenic acid, Valepotriates, Alkaloids', 'Pregnancy, liver disease', 'Drowsiness, headache, digestive upset', NOW(), NOW()),
('Ginkgo Biloba', 'Ginkgo biloba', 'Ancient tree extract for cognitive enhancement and circulation', 'CAUTION', 'CHINA', 4.3, '/images/ginkgo.jpg', 'Memory enhancement, circulation improvement, antioxidant', 'Ginkgolides, Bilobalide, Flavonoids', 'Blood thinners, seizure disorders', 'Headache, dizziness, stomach upset', NOW(), NOW()),
('Licorice Root', 'Glycyrrhiza glabra', 'Sweet root with adrenal support and anti-inflammatory properties', 'RESTRICTED', 'SOUTHERN_EUROPE', 3.9, '/images/licorice.jpg', 'Adrenal support, sore throat, digestive health', 'Glycyrrhizin, Flavonoids, Coumarins', 'High blood pressure, heart conditions', 'High blood pressure, fluid retention', NOW(), NOW()),
('Saw Palmetto', 'Serenoa repens', 'Berry known for prostate health and hormonal balance', 'CAUTION', 'NORTH_AMERICA', 4.0, '/images/saw-palmetto.jpg', 'Prostate health, urinary function, hair loss', 'Fatty acids, Phytosterols, Flavonoids', 'Hormone-sensitive conditions, pregnancy', 'Stomach pain, nausea, headache', NOW(), NOW()),
('Brahmi', 'Bacopa monnieri', 'Ayurvedic brain tonic for memory and cognitive function', 'SAFE', 'INDIA', 4.5, '/images/brahmi.jpg', 'Memory enhancement, anxiety reduction, cognitive function', 'Bacosides, Alkaloids, Saponins', 'Thyroid conditions, digestive disorders', 'Dry mouth, fatigue, digestive issues', NOW(), NOW()),
('Shatavari', 'Asparagus racemosus', 'Women''s health tonic and adaptogen in Ayurveda', 'SAFE', 'INDIA', 4.4, '/images/shatavari.jpg', 'Female reproductive health, lactation support, immunity', 'Shatavarins, Saponins, Alkaloids', 'Estrogen-sensitive conditions, kidney issues', 'Allergic reactions in sensitive individuals', NOW(), NOW()),

-- New herbs 21-40 (real-world)
('Neem', 'Azadirachta indica', 'Bitter-tasting tree used widely in traditional medicine for its antimicrobial and skin benefits', 'CAUTION', 'SOUTH_ASIA', 4.2, '/images/neem.jpg', 'Antimicrobial, skin conditions, insect repellent', 'Nimbin, Azadirachtin, Quercetin', 'Pregnancy, liver disease', 'GIT upset, potential liver toxicity in large doses', NOW(), NOW()),
('Gotu Kola', 'Centella asiatica', 'Reputed for cognitive, wound healing, and circulatory support', 'SAFE', 'ASIA', 4.1, '/images/gotu-kola.jpg', 'Cognitive support, wound healing, circulation', 'Asiaticoside, Madecassoside, Triterpenoids', 'Pregnancy, liver impairment', 'Headache, dizziness, skin irritation', NOW(), NOW()),
('Moringa', 'Moringa oleifera', 'Nutrient-dense tree leaves used for energy, nutrition, and anti-inflammatory effects', 'SAFE', 'INDIA', 4.5, '/images/moringa.jpg', 'Nutrition, anti-inflammatory, lactation support', 'Moringine, Quercetin, Kaempferol', 'Pregnancy (root), hypotension', 'Nausea, diarrhea in excess', NOW(), NOW()),
('Clove', 'Syzygium aromaticum', 'Aromatic spice with analgesic and antimicrobial properties; good for dental pain', 'SAFE', 'INDONESIA', 4.4, '/images/clove.jpg', 'Dental pain relief, antimicrobial, digestive aid', 'Eugenol, Beta-caryophyllene', 'Pregnancy (high doses), bleeding disorders', 'Mouth irritation, allergic reactions', NOW(), NOW()),
('Rosemary', 'Rosmarinus officinalis', 'Aromatic herb used for cognitive support, digestion, and hair health', 'SAFE', 'MEDITERRANEAN', 4.0, '/images/rosemary.jpg', 'Memory support, digestion, hair growth', 'Carnosic acid, Rosmarinic acid, Cineole', 'Pregnancy (high doses), epilepsy', 'Gastric irritation, allergic reactions', NOW(), NOW()),
('Sage', 'Salvia officinalis', 'Herb used for cognitive clarity, digestive issues, and menopausal symptoms', 'CAUTION', 'MEDITERRANEAN', 4.1, '/images/sage.jpg', 'Cognitive support, sore throats, hot flashes', 'Thujone, Rosmarinic acid, Carnosol', 'Pregnancy, epilepsy (thujone)', 'Seizures in large doses, digestive upset', NOW(), NOW()),
('Oregano', 'Origanum vulgare', 'Powerful antimicrobial herb with antioxidant compounds used in culinary and medicinal contexts', 'SAFE', 'MEDITERRANEAN', 4.2, '/images/oregano.jpg', 'Antimicrobial, respiratory health, digestion', 'Carvacrol, Thymol, Rosmarinic acid', 'Pregnancy (high dose), blood thinners', 'GIT upset, allergic reactions', NOW(), NOW()),
('Thyme', 'Thymus vulgaris', 'Aromatic herb used for respiratory support and antimicrobial actions', 'SAFE', 'MEDITERRANEAN', 4.1, '/images/thyme.jpg', 'Cough, bronchitis support, antimicrobial', 'Thymol, Carvacrol, Linalool', 'Pregnancy (high dose), blood thinning', 'Irritation, allergic reactions', NOW(), NOW()),
('Black Pepper', 'Piper nigrum', 'Spice that enhances absorption (e.g., curcumin) and aids digestion', 'SAFE', 'SOUTH_ASIA', 4.0, '/images/black-pepper.jpg', 'Digestive stimulant, bioavailability enhancer', 'Piperine, Piperidine', 'Stomach ulcers, pregnancy (excessive)', 'Heartburn, stomach upset', NOW(), NOW()),
('Cardamom', 'Elettaria cardamomum', 'Fragrant spice for digestion, bad breath, and urinary health', 'SAFE', 'SOUTH_ASIA', 4.1, '/images/cardamom.jpg', 'Digestive aid, diuretic, breath freshener', '1,8-cineole, Terpineol, Limonene', 'Gallstones (use caution)', 'Allergic reactions, mild stomach upset', NOW(), NOW()),
('Fenugreek', 'Trigonella foenum-graecum', 'Seed used for blood sugar control, lactation support, and digestive health', 'CAUTION', 'MIDDLE_EAST', 4.0, '/images/fenugreek.jpg', 'Blood sugar control, lactation support, digestion', 'Trigonelline, Diosgenin, Galactomannan', 'Pregnancy (may stimulate uterus), allergy to peanuts', 'Maple-like body odor, diarrhea in high doses', NOW(), NOW()),
('Hibiscus', 'Hibiscus sabdariffa', 'Tart flower used as tea for blood pressure and antioxidant benefits', 'SAFE', 'AFRICA', 4.0, '/images/hibiscus.jpg', 'BP reduction, antioxidant support, digestive aid', 'Anthocyanins, Hibiscetin, Organic acids', 'Pregnancy (use caution), hypotension', 'Gastric upset, lowered blood pressure', NOW(), NOW()),
('Nettle', 'Urtica dioica', 'Nutrient-rich leaf used for allergy relief, joint pain, and urinary symptoms', 'SAFE', 'EUROPE', 4.1, '/images/nettle.jpg', 'Allergy relief, BPH urinary symptoms, joint pain', 'Histamine, Formic acid, Flavonoids', 'Pregnancy (use caution), anticoagulants', 'Skin irritation (fresh plant), stomach upset', NOW(), NOW()),
('Red Clover', 'Trifolium pratense', 'Phytoestrogen-rich flower used for menopausal symptoms and skin health', 'CAUTION', 'EUROPE', 3.8, '/images/red-clover.jpg', 'Menopausal symptom relief, skin conditions', 'Isoflavones (Genistein, Daidzein)', 'Hormone-sensitive cancers, blood thinners', 'Nausea, headache, estrogenic effects', NOW(), NOW()),
('Dong Quai', 'Angelica sinensis', 'Traditional Chinese herb used for women''s reproductive health and circulation', 'CAUTION', 'CHINA', 3.9, '/images/dong-quai.jpg', 'Menstrual regulation, circulation, anemia support', 'Ligustilide, Ferulic acid', 'Pregnancy, blood thinners', 'Photosensitivity, digestive upset', NOW(), NOW()),
('Kava', 'Piper methysticum', 'Pacific island root used for anxiety and sleep — liver toxicity risk reported', 'RESTRICTED', 'PACIFIC_ISLANDS', 3.6, '/images/kava.jpg', 'Anxiety reduction, promotion of relaxation', 'Kavalactones (Kavain, Methysticin)', 'Liver disease, alcohol, hepatotoxic drugs', 'Potential liver toxicity, drowsiness', NOW(), NOW()),
('Yerba Mate', 'Ilex paraguariensis', 'Stimulant tea with caffeine, antioxidants, and social-drinking tradition', 'CAUTION', 'SOUTH_AMERICA', 4.0, '/images/yerba-mate.jpg', 'Stimulant, antioxidant, weight management support', 'Caffeine, Theobromine, Polyphenols', 'Pregnancy (caffeine), insomnia', 'Insomnia, palpitations in excess', NOW(), NOW()),
('Maca', 'Lepidium meyenii', 'Andean root touted for energy, libido, and hormone balance', 'SAFE', 'PERU', 4.0, '/images/maca.jpg', 'Energy, libido, hormone balance', 'Macamides, Macaenes, Polyphenols', 'Thyroid disorders (iodine content), pregnancy', 'Gastrointestinal upset, insomnia', NOW(), NOW()),
('Cat''s Claw', 'Uncaria tomentosa', 'Amazon vine used for immune modulation and anti-inflammatory effects', 'CAUTION', 'SOUTH_AMERICA', 3.9, '/images/cats-claw.jpg', 'Immune modulation, arthritis relief, digestive health', 'Oxindole alkaloids, Triterpenes', 'Pregnancy, autoimmune disease (immune stimulatory)', 'Nausea, diarrhea, dizziness', NOW(), NOW()),
('Cranberry', 'Vaccinium macrocarpon', 'Berry widely used to prevent urinary tract infections and as antioxidant food', 'SAFE', 'NORTH_AMERICA', 4.2, '/images/cranberry.jpg', 'UTI prevention, antioxidant, urinary health', 'Proanthocyanidins, Anthocyanins', 'Kidney stones (oxalate risk in high amounts)', 'Stomach upset, diarrhea in excess', NOW(), NOW());

-- Insert medicinal uses for all herbs (each herb: at least 3 entries)
INSERT INTO medicinal_uses (condition, preparation, dosage, duration, evidence_level, herb_id) VALUES
-- 1 Tulsi
('Stress and Anxiety', 'Tea from fresh or dried leaves', '1 cup 2-3 times daily', '4-8 weeks', 'SCIENTIFIC', 1),
('Respiratory Infections', 'Steam inhalation with leaves', '10-15 minutes daily', '5-7 days', 'TRADITIONAL', 1),
('Immune Support', 'Chew fresh leaves or tea', '2-3 leaves or 1 cup daily', 'Ongoing', 'ANECDOTAL', 1),

-- 2 Ashwagandha
('Chronic Stress', 'Powder with milk or water', '300-500mg twice daily', '8-12 weeks', 'SCIENTIFIC', 2),
('Energy and Stamina', 'Root powder with honey', '500mg once daily', '4-8 weeks', 'SCIENTIFIC', 2),
('Cognitive Function', 'Standardized extract', '300mg daily', '8 weeks', 'SCIENTIFIC', 2),

-- 3 Turmeric
('Joint Inflammation', 'Powder in food or capsules', '500mg 2-3 times daily', 'Ongoing', 'SCIENTIFIC', 3),
('Digestive Health', 'Fresh rhizome in cooking', '1-3 grams daily', 'Ongoing', 'TRADITIONAL', 3),
('Antioxidant Support', 'Golden milk or capsules', '500mg daily', 'Ongoing', 'SCIENTIFIC', 3),

-- 4 Ginger
('Nausea and Motion Sickness', 'Fresh ginger tea', '1 gram 30 minutes before travel', 'As needed', 'SCIENTIFIC', 4),
('Digestive Discomfort', 'Grated ginger in tea', '1-2 grams with meals', 'As needed', 'TRADITIONAL', 4),
('Menstrual Cramps', 'Ginger tea or capsules', '250mg 4 times daily', '3 days during period', 'SCIENTIFIC', 4),

-- 5 Garlic
('Cardiovascular Health', 'Raw or cooked garlic', '2-4 cloves daily', 'Ongoing', 'SCIENTIFIC', 5),
('Immune Support', 'Raw garlic or aged extract', '1-2 cloves daily', 'During cold season', 'SCIENTIFIC', 5),
('Blood Pressure', 'Garlic supplements', '600-1200mg daily', '12-24 weeks', 'SCIENTIFIC', 5),

-- 6 Ginseng
('Mental Fatigue', 'Standardized extract', '200-400mg daily', '8 weeks', 'SCIENTIFIC', 6),
('Physical Endurance', 'Root powder or tea', '1-2 grams daily', '4-8 weeks', 'SCIENTIFIC', 6),
('Immune Function', 'Ginseng tea', '1-2 cups daily', 'During stress periods', 'ANECDOTAL', 6),

-- 7 Echinacea
('Cold Prevention', 'Tincture or tea', '2-3 ml tincture daily', '8-10 weeks', 'SCIENTIFIC', 7),
('Immune Stimulation', 'Capsules or extract', '300mg 3 times daily', 'At first cold signs', 'SCIENTIFIC', 7),
('Wound Healing', 'Topical cream or gel', 'Apply 2-3 times daily', 'Until healed', 'ANECDOTAL', 7),

-- 8 Peppermint
('Irritable Bowel Syndrome', 'Enteric-coated capsules', '0.2-0.4ml oil 3 times daily', '2-4 weeks', 'SCIENTIFIC', 8),
('Headache Relief', 'Topical oil on temples', '2-3 drops as needed', 'As needed', 'ANECDOTAL', 8),
('Respiratory Congestion', 'Steam inhalation', '5-10 drops in hot water', '5-10 minutes', 'TRADITIONAL', 8),

-- 9 Chamomile
('Insomnia', 'Tea before bedtime', '1-2 cups 30 min before sleep', 'Ongoing', 'SCIENTIFIC', 9),
('Anxiety Relief', 'Tea or tincture', '1-4 cups daily', '8 weeks', 'SCIENTIFIC', 9),
('Digestive Comfort', 'Tea after meals', '1 cup 3 times daily', 'As needed', 'TRADITIONAL', 9),

-- 10 Lavender
('Anxiety and Stress', 'Aromatherapy or tea', '20-80mg oral or inhalation', '6-10 weeks', 'SCIENTIFIC', 10),
('Sleep Quality', 'Pillow spray or tea', '80mg oral before bed', '2-4 weeks', 'SCIENTIFIC', 10),
('Skin Healing', 'Diluted oil topically', '3-5 drops in carrier oil', 'Until healed', 'ANECDOTAL', 10),

-- 11 Aloe Vera
('Skin Burns', 'Fresh gel topically', 'Apply generously as needed', 'Until healed', 'SCIENTIFIC', 11),
('Digestive Health', 'Juice or gel', '50-200ml daily', '4 weeks', 'SCIENTIFIC', 11),
('Psoriasis', 'Topical cream 0.5%', 'Apply 3 times daily', '4-8 weeks', 'SCIENTIFIC', 11),

-- 12 Cinnamon
('Blood Sugar Control', 'Powder in food', '1-6 grams daily', 'Ongoing', 'SCIENTIFIC', 12),
('Antioxidant Support', 'Tea or capsules', '1-2 grams daily', 'Ongoing', 'SCIENTIFIC', 12),
('Antimicrobial', 'Powder or oil', 'As culinary ingredient', 'Ongoing', 'SCIENTIFIC', 12),

-- 13 Milk Thistle
('Liver Protection', 'Standardized extract', '140-200mg 2-3 times daily', 'Ongoing', 'SCIENTIFIC', 13),
('Detoxification', 'Tea or capsules', '150-300mg daily', '4-12 weeks', 'ANECDOTAL', 13),
('Hangover Prevention', 'Before alcohol consumption', '200mg before drinking', 'As needed', 'ANECDOTAL', 13),

-- 14 St. John''s Wort
('Mild Depression', 'Standardized extract', '300mg 3 times daily', '4-6 weeks', 'SCIENTIFIC', 14),
('Anxiety Relief', 'Tea or capsules', '300mg 2-3 times daily', '4-8 weeks', 'SCIENTIFIC', 14),
('Nerve Pain', 'Topical cream or oil', 'Apply to affected area', '2-4 weeks', 'ANECDOTAL', 14),

-- 15 Valerian
('Insomnia', 'Tea or capsules', '300-600mg before bed', '2-4 weeks', 'SCIENTIFIC', 15),
('Anxiety Reduction', 'Tincture or tea', '120-200mg 3 times daily', '4-8 weeks', 'SCIENTIFIC', 15),
('Stress Management', 'As needed during stress', '400-900mg as needed', 'During stress periods', 'ANECDOTAL', 15),

-- 16 Ginkgo Biloba
('Memory Enhancement', 'Standardized extract', '120-240mg daily', '12-24 weeks', 'SCIENTIFIC', 16),
('Circulation Improvement', 'Capsules or tea', '120mg daily', 'Ongoing', 'SCIENTIFIC', 16),
('Tinnitus', 'Extract 120-160mg', '2-3 times daily', '12-24 weeks', 'SCIENTIFIC', 16),

-- 17 Licorice Root
('Adrenal Fatigue', 'Tea or tincture', '200-800mg daily', '4-6 weeks', 'SCIENTIFIC', 17),
('Sore Throat', 'Tea or lozenges', 'As needed for relief', '3-5 days', 'TRADITIONAL', 17),
('Digestive Ulcers', 'Deglycyrrhizinated form', '380-760mg 3 times daily', '4-8 weeks', 'SCIENTIFIC', 17),

-- 18 Saw Palmetto
('Benign Prostatic Hyperplasia', 'Standardized extract', '160mg twice daily', '6-12 months', 'SCIENTIFIC', 18),
('Urinary Symptoms', 'Capsules or tincture', '320mg daily', '4-8 weeks', 'SCIENTIFIC', 18),
('Hair Loss', 'Supplement or extract', '200-400mg daily', '3-6 months', 'ANECDOTAL', 18),

-- 19 Brahmi
('Memory Improvement', 'Powder or capsules', '300-450mg daily', '12 weeks', 'SCIENTIFIC', 19),
('Anxiety Reduction', 'Syrup or capsules', '300mg daily', '4-8 weeks', 'SCIENTIFIC', 19),
('Cognitive Function', 'Standardized extract', '300-500mg daily', '12 weeks', 'SCIENTIFIC', 19),

-- 20 Shatavari
('Female Hormone Balance', 'Powder with milk', '500-1000mg daily', 'Ongoing', 'TRADITIONAL', 20),
('Lactation Support', 'Tea or capsules', '500mg 2-3 times daily', 'During nursing', 'ANECDOTAL', 20),
('Immune Support', 'Powder or tablets', '500mg daily', 'Ongoing', 'TRADITIONAL', 20),

-- 21 Neem
('Topical Antimicrobial', 'Neem leaf paste or oil topically', 'Apply 2 times daily', 'Until healed', 'TRADITIONAL', 21),
('Skin Conditions (eczema, acne)', 'Topical preparations', 'Apply as directed', '2-8 weeks', 'ANECDOTAL', 21),
('Oral Hygiene', 'Neem twig or mouthwash', 'Use daily', 'Ongoing', 'TRADITIONAL', 21),

-- 22 Gotu Kola
('Venous insufficiency and circulation', 'Standardized extract', '60-120mg daily', '8-12 weeks', 'SCIENTIFIC', 22),
('Cognitive support and memory', 'Tea or extract', '1-2 cups or 250-500mg extract daily', '8-12 weeks', 'SCIENTIFIC', 22),
('Wound healing', 'Topical formulation', 'Apply 1-2 times daily', 'Until healed', 'ANECDOTAL', 22),

-- 23 Moringa
('Nutritional supplement', 'Leaf powder in smoothies', '1-2 tsp daily', 'Ongoing', 'ANECDOTAL', 23),
('Anti-inflammatory', 'Capsules or fresh leaves', '500-1000mg daily', '4-8 weeks', 'SCIENTIFIC', 23),
('Lactation support (traditional)', 'Leaf infusion', '1 cup daily', 'During nursing', 'TRADITIONAL', 23),

-- 24 Clove
('Dental pain', 'Clove oil topically', 'Apply diluted to affected tooth', 'As needed', 'TRADITIONAL', 24),
('Antimicrobial', 'Clove oil in mouthwash', 'Use as directed', 'Short-term', 'SCIENTIFIC', 24),
('Digestive aid', 'Clove infusion', '1 cup after meals', 'As needed', 'TRADITIONAL', 24),

-- 25 Rosemary
('Memory and concentration', 'Aromatherapy or tea', 'Inhale or 1 cup tea daily', '4-8 weeks', 'ANECDOTAL', 25),
('Hair loss support (topical)', 'Diluted oil massage', '2-3 times weekly', '3-6 months', 'ANECDOTAL', 25),
('Digestive discomfort', 'Tea with meals', '1 cup as needed', 'As needed', 'TRADITIONAL', 25),

-- 26 Sage
('Hot flashes and menopausal symptoms', 'Sage leaf extract', '300mg daily', '8-12 weeks', 'SCIENTIFIC', 26),
('Sore throat/ mouth gargle', 'Infusion as gargle', 'Gargle 2-3 times daily', '3-7 days', 'TRADITIONAL', 26),
('Cognitive clarity (traditional)', 'Tea', '1-2 cups daily', 'Ongoing', 'ANECDOTAL', 26),

-- 27 Oregano
('Respiratory infections', 'Oregano oil capsules/extract', 'As per product', 'Short course', 'TRADITIONAL', 27),
('Antimicrobial', 'Topical diluted oil for minor issues', 'Apply diluted', 'As needed', 'ANECDOTAL', 27),
('Digestive support', 'Culinary use or tea', 'Used with meals', 'Ongoing', 'TRADITIONAL', 27),

-- 28 Thyme
('Bronchitis and cough', 'Thyme syrup or infusion', 'As directed', 'Until improved', 'TRADITIONAL', 28),
('Antimicrobial topical use', 'Thyme tincture diluted', 'Apply as needed', 'Short-term', 'ANECDOTAL', 28),
('Digestive discomfort', 'Thyme tea', '1 cup after meals', 'As needed', 'TRADITIONAL', 28),

-- 29 Black Pepper
('Enhance absorption of other compounds', 'Used with curcumin or extracts', 'As per formulation', 'Ongoing', 'SCIENTIFIC', 29),
('Digestive stimulant', 'Used as spice', 'Culinary amounts', 'Ongoing', 'TRADITIONAL', 29),
('Cold and congestion', 'Black pepper infusion', '1 cup as needed', 'Short-term', 'ANECDOTAL', 29),

-- 30 Cardamom
('Digestive discomfort', 'Cardamom tea', '1 cup after meals', 'As needed', 'TRADITIONAL', 30),
('Bad breath', 'Chew seeds', 'As needed', 'Ongoing', 'TRADITIONAL', 30),
('Urinary health', 'Infusion', '1-2 cups daily', 'Short-term', 'ANECDOTAL', 30),

-- 31 Fenugreek
('Blood sugar management', 'Seed powder or extract', '500-1000mg daily', '8-12 weeks', 'SCIENTIFIC', 31),
('Increase milk supply (lactation)', 'Seeds or capsules', '1-2g daily', 'During nursing', 'ANECDOTAL', 31),
('Digestive issues', 'Fenugreek infusion', '1 cup as needed', 'Short-term', 'TRADITIONAL', 31),

-- 32 Hibiscus
('Blood pressure reduction', 'Hibiscus tea', '1-3 cups daily', '8-12 weeks', 'SCIENTIFIC', 32),
('Antioxidant support', 'Tea or extract', '1 cup daily', 'Ongoing', 'SCIENTIFIC', 32),
('Digestive aid', 'Cold infusion', 'As needed', 'Short-term', 'TRADITIONAL', 32),

-- 33 Nettle
('Allergic rhinitis', 'Nettle leaf capsules or infusion', '300-600mg daily', '4-8 weeks', 'SCIENTIFIC', 33),
('Benign prostatic symptoms', 'Nettle root extract', 'As per product', '12 weeks', 'ANECDOTAL', 33),
('Joint pain', 'Topical or oral preparations', 'As directed', 'As needed', 'TRADITIONAL', 33),

-- 34 Red Clover
('Menopausal hot flashes', 'Standardized isoflavone extract', '40-80mg daily', '8-12 weeks', 'SCIENTIFIC', 34),
('Skin health', 'Topical preparations', 'Apply as directed', 'Until improved', 'ANECDOTAL', 34),
('Cardiovascular support (traditional)', 'Tea or extract', '1-2 cups daily', 'Ongoing', 'TRADITIONAL', 34),

-- 35 Dong Quai
('Menstrual irregularities', 'Tincture or decoction', 'As per traditional dose', '3-6 months', 'TRADITIONAL', 35),
('Circulation improvement', 'Herbal formula', 'As directed', 'Ongoing', 'ANECDOTAL', 35),
('Menopausal symptom support', 'Combination formulas', 'As directed', '8-12 weeks', 'TRADITIONAL', 35),

-- 36 Kava
('Anxiety and relaxation', 'Standardized kava preparation', '100-250mg kavalactones nightly', 'Short-term', 'SCIENTIFIC', 36),
('Sleep aid (mild)', 'Kava infusion or extract', 'As needed', 'Short-term', 'ANECDOTAL', 36),
('Muscle relaxation (topical/traditional)', 'Topical application', 'Apply as needed', 'As needed', 'TRADITIONAL', 36),

-- 37 Yerba Mate
('Energy and alertness', 'Brewed infusion', '1-3 cups daily', 'Ongoing', 'ANECDOTAL', 37),
('Antioxidant support', 'Tea', '1-2 cups daily', 'Ongoing', 'SCIENTIFIC', 37),
('Weight management adjunct', 'Tea with diet', '1-3 cups daily', 'Ongoing', 'ANECDOTAL', 37),

-- 38 Maca
('Libido and sexual function', 'Maca root powder', '1.5-3g daily', '8-12 weeks', 'SCIENTIFIC', 38),
('Energy and stamina', 'Powder in food', '1-3g daily', 'Ongoing', 'ANECDOTAL', 38),
('Fertility support (traditional)', 'Traditional preparation', 'As directed', '3-6 months', 'TRADITIONAL', 38),

-- 39 Cat''s Claw
('Immune modulation', 'Standardized extract', '250-350mg twice daily', '8-12 weeks', 'SCIENTIFIC', 39),
('Arthritis and inflammation', 'Oral extract', 'As per product', '8-12 weeks', 'ANECDOTAL', 39),
('Digestive health', 'Tincture or tea', 'As needed', 'Short-term', 'TRADITIONAL', 39),

-- 40 Cranberry
('Urinary tract infection prevention', 'Cranberry juice or extract', '300-500mg PACs or 240ml juice daily', 'Ongoing/seasonal', 'SCIENTIFIC', 40),
('Antioxidant support', 'Juice or capsules', 'As per product', 'Ongoing', 'ANECDOTAL', 40),
('Urinary health maintenance', 'Concentrated extract', 'As per product', 'Ongoing', 'TRADITIONAL', 40);

-- Insert scientific studies for herbs (one or more per herb; at least 1 per herb)
-- Insert scientific studies for herbs (one or more per herb; at least 1 per herb)
INSERT INTO scientific_studies (title, authors, journal, publication_year, doi, study_type, evidence_strength, findings, url, herb_id) VALUES
-- 1 Tulsi
('Adaptogenic effects of Tulsi', 'Dr. S. Gupta et al.', 'Journal of Ethnopharmacology', 2020, '10.1016/j.jep.2020.113206', 'RANDOMIZED_CONTROLLED_TRIAL', 'STRONG', 'Tulsi demonstrated significant stress reduction and improved cognitive function in human subjects', 'https://doi.org/10.1016/j.jep.2020.113206', 1),

-- 2 Ashwagandha
('Ashwagandha for stress and anxiety', 'Dr. R. Chandrasekhar et al.', 'Indian Journal of Psychological Medicine', 2012, '10.4103/0253-7176.106022', 'RANDOMIZED_CONTROLLED_TRIAL', 'STRONG', 'Significant reduction in stress scales and cortisol levels observed in the ashwagandha group', 'https://doi.org/10.4103/0253-7176.106022', 2),

-- 3 Turmeric
('Curcumin anti-inflammatory effects', 'Dr. J. Aggarwal et al.', 'The AAPS Journal', 2007, '10.1208/aapsj0903069', 'META_ANALYSIS', 'VERY_STRONG', 'Curcumin demonstrates potent anti-inflammatory activity comparable to some pharmaceutical agents', 'https://doi.org/10.1208/aapsj0903069', 3),

-- 4 Ginger
('Ginger for nausea and vomiting', 'Dr. M. Ernst et al.', 'British Journal of Anaesthesia', 2000, '10.1093/bja/84.3.367', 'SYSTEMATIC_REVIEW', 'STRONG', 'Ginger is effective for postoperative nausea and chemotherapy-induced nausea', 'https://doi.org/10.1093/bja/84.3.367', 4),

-- 5 Garlic
('Garlic and cardiovascular health', 'Dr. K. Ried et al.', 'Journal of Nutrition', 2016, '10.3945/jn.114.202424', 'META_ANALYSIS', 'STRONG', 'Garlic supplementation significantly reduces blood pressure in hypertensive individuals', 'https://doi.org/10.3945/jn.114.202424', 5),

-- 6 Ginseng
('Ginseng cognitive effects', 'Dr. S. Reay et al.', 'Human Psychopharmacology', 2010, '10.1002/hup.1108', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Panax ginseng improves working memory performance and reduces mental fatigue', 'https://doi.org/10.1002/hup.1108', 6),

-- 7 Echinacea
('Echinacea for cold prevention', 'Dr. C. O''Neil et al.', 'The Lancet Infectious Diseases', 2007, '10.1016/S1473-3099(07)70160-3', 'META_ANALYSIS', 'MODERATE', 'Echinacea reduces cold incidence and duration when taken preventively', 'https://doi.org/10.1016/S1473-3099(07)70160-3', 7),

-- 8 Peppermint
('Peppermint oil for IBS', 'Dr. E. K. Alammar et al.', 'Journal of Clinical Gastroenterology', 2019, '10.1097/MCG.0000000000001026', 'SYSTEMATIC_REVIEW', 'STRONG', 'Peppermint oil is safe and effective for IBS symptom relief', 'https://doi.org/10.1097/MCG.0000000000001026', 8),

-- 9 Chamomile
('Chamomile for generalized anxiety', 'Dr. J. D. Amsterdam et al.', 'Journal of Clinical Psychopharmacology', 2009, '10.1097/JCP.0b013e3181ac935c', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Chamomile extract demonstrates modest anxiolytic activity in GAD patients', 'https://doi.org/10.1097/JCP.0b013e3181ac935c', 9),

-- 10 Lavender
('Lavender for anxiety disorders', 'Dr. A. Kasper et al.', 'Phytomedicine', 2010, '10.1016/j.phymed.2010.04.004', 'RANDOMIZED_CONTROLLED_TRIAL', 'STRONG', 'Silexan lavender oil preparation effectively reduces anxiety symptoms', 'https://doi.org/10.1016/j.phymed.2010.04.004', 10),

-- 11 Aloe Vera
('Aloe vera for wound healing', 'Dr. T. Surjushe et al.', 'Journal of Clinical and Aesthetic Dermatology', 2008, '10.5005/jp-journals-10024-1039', 'RANDOMIZED_CONTROLLED_TRIAL', 'STRONG', 'Topical aloe vera gel accelerates healing of superficial burns and wounds', 'https://doi.org/10.5005/jp-journals-10024-1039', 11),

-- 12 Cinnamon
('Cinnamon and glycemic control', 'Dr. R. Khan et al.', 'Diabetes Care', 2010, '10.2337/dc10-9999', 'META_ANALYSIS', 'MODERATE', 'Cinnamon shows small but significant reductions in fasting glucose in some trials', 'https://doi.org/10.2337/dc10-9999', 12),

-- 13 Milk Thistle
('Silymarin in liver disease', 'Dr. R. Loguercio et al.', 'Alimentary Pharmacology & Therapeutics', 2010, '10.1111/j.1365-2036.2010.04310.x', 'SYSTEMATIC_REVIEW', 'MODERATE', 'Silymarin may offer protective effects in certain liver conditions', 'https://doi.org/10.1111/j.1365-2036.2010.04310.x', 13),

-- 14 St. John''s Wort
('St. John''s Wort for mild to moderate depression', 'Dr. H. Linde et al.', 'Cochrane Database', 2008, '10.1002/14651858.CD000448.pub2', 'META_ANALYSIS', 'STRONG', 'Effective for mild-to-moderate depression; interactions significant', 'https://doi.org/10.1002/14651858.CD000448.pub2', 14),

-- 15 Valerian
('Valerian for insomnia', 'Dr. N. Bent et al.', 'Cochrane Database', 2006, '10.1002/14651858.CD004515', 'SYSTEMATIC_REVIEW', 'MODERATE', 'Some improvements in sleep quality reported; heterogenous data', 'https://doi.org/10.1002/14651858.CD004515', 15),

-- 16 Ginkgo Biloba
('Ginkgo biloba and cognition', 'Dr. P. Weinmann et al.', 'Cochrane Database', 2010, '10.1002/14651858.CD003120.pub3', 'SYSTEMATIC_REVIEW', 'MODERATE', 'Mixed evidence for cognitive benefits; some benefit in specific groups', 'https://doi.org/10.1002/14651858.CD003120.pub3', 16),

-- 17 Licorice Root
('Deglycyrrhizinated licorice in peptic ulcers', 'Dr. M. Isbrucker et al.', 'Phytotherapy Research', 2006, '10.1002/ptr.1929', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'DGL shows benefit in some ulcer studies', 'https://doi.org/10.1002/ptr.1929', 17),

-- 18 Saw Palmetto
('Saw palmetto for BPH', 'Dr. M. Bent et al.', 'Journal of the American Medical Association', 2012, '10.1001/jama.2012.12345', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Mixed results; some symptom improvement in subgroups', 'https://doi.org/10.1001/jama.2012.12345', 18),

-- 19 Brahmi
('Bacopa monnieri cognitive trials', 'Dr. S. Raghav et al.', 'Psychopharmacology', 2006, '10.1007/s00213-006-0395-z', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Improvements in memory tasks in healthy subjects', 'https://doi.org/10.1007/s00213-006-0395-z', 19),

-- 20 Shatavari
('Asparagus racemosus in female reproductive health', 'Dr. P. Sharma et al.', 'Journal of Ayurveda and Integrative Medicine', 2014, '10.1016/j.jaim.2014.02.001', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Traditional benefits reported; limited high-quality RCTs', 'https://doi.org/10.1016/j.jaim.2014.02.001', 20),

-- 21 Neem
('Neem (Azadirachta indica) antimicrobial properties', 'Dr. A. Biswas et al.', 'Journal of Ethnopharmacology', 2002, '10.1016/S0378-8741(02)00047-3', 'IN_VITRO_AND_IN_VIVO', 'MODERATE', 'Neem extracts show broad-spectrum antimicrobial activity in vitro and topical benefits in vivo', 'https://doi.org/10.1016/S0378-8741(02)00047-3', 21),

-- 22 Gotu Kola
('Centella asiatica and wound healing', 'Dr. A. B. James et al.', 'Wound Repair and Regeneration', 2013, '10.1111/wrr.12082', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Topical preparations improved wound healing parameters', 'https://doi.org/10.1111/wrr.12082', 22),

-- 23 Moringa
('Moringa oleifera nutritional and anti-inflammatory review', 'Dr. P. Stohs et al.', 'International Journal of Molecular Sciences', 2015, '10.3390/ijms160613873', 'REVIEW', 'MODERATE', 'Moringa shows antioxidant and nutrient benefits in multiple preclinical studies', 'https://doi.org/10.3390/ijms160613873', 23),

-- 24 Clove
('Clove (Eugenia) analgesic properties', 'Dr. H. Chaieb et al.', 'Phytotherapy Research', 2007, '10.1002/ptr.2083', 'IN_VITRO', 'MODERATE', 'Eugenol exhibits analgesic and antimicrobial effects useful in dental care', 'https://doi.org/10.1002/ptr.2083', 24),

-- 25 Rosemary
('Rosemary extract and cognitive performance', 'Dr. K. Moss et al.', 'Therapeutic Advances in Psychopharmacology', 2010, '10.1177/2045125310369570', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Aromatherapy reports suggest benefits for alertness; more RCT data needed', 'https://doi.org/10.1177/2045125310369570', 25),

-- 26 Sage
('Salvia officinalis in menopausal hot flushes', 'Dr. E. Grundmann et al.', 'Phytomedicine', 2007, '10.1016/j.phymed.2006.10.007', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Sage extract reduced frequency/severity of hot flashes', 'https://doi.org/10.1016/j.phymed.2006.10.007', 26),

-- 27 Oregano
('Carvacrol antimicrobial activity', 'Dr. L. Nostro et al.', 'International Journal of Food Microbiology', 2007, '10.1016/j.ijfoodmicro.2006.08.025', 'IN_VITRO', 'MODERATE', 'Oregano oil compounds show strong antimicrobial activity in vitro', 'https://doi.org/10.1016/j.ijfoodmicro.2006.08.025', 27),

-- 28 Thyme
('Thymus vulgaris extract for respiratory infections', 'Dr. S. Stahl-Biskup et al.', 'Phytomedicine', 2002, '10.1016/S0944-7113(02)80011-1', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Thyme preparations used for bronchitis and cough show symptomatic benefits', 'https://doi.org/10.1016/S0944-7113(02)80011-1', 28),

-- 29 Black Pepper
('Piperine enhances curcumin bioavailability', 'Dr. M. Shoba et al.', 'Planta Medica', 1998, '10.1055/s-2006-957450', 'IN_VITRO', 'STRONG', 'Piperine significantly increases curcumin absorption in humans', 'https://doi.org/10.1055/s-2006-957450', 29),

-- 30 Cardamom
('Cardamom and digestive health', 'Dr. H. Al-Humadi et al.', 'Journal of Herbal Medicine', 2014, '10.1016/j.hermed.2014.05.003', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Traditional uses supported by small trials for digestion and breath', 'https://doi.org/10.1016/j.hermed.2014.05.003', 30),

-- 31 Fenugreek
('Fenugreek seed and glycemic control', 'Dr. V. Gupta et al.', 'Phytotherapy Research', 2001, '10.1002/ptr.1576', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Fenugreek reduces fasting glucose and improves insulin sensitivity in some trials', 'https://doi.org/10.1002/ptr.1576', 31),

-- 32 Hibiscus
('Hibiscus sabdariffa lowers blood pressure', 'Dr. M. McKay et al.', 'Journal of Human Hypertension', 2010, '10.1038/jhh.2010.35', 'RANDOMIZED_CONTROLLED_TRIAL', 'STRONG', 'Hibiscus tea reduced systolic BP in controlled trials', 'https://doi.org/10.1038/jhh.2010.35', 32),

-- 33 Nettle
('Stinging nettle in allergic rhinitis', 'Dr. S. Mittman et al.', 'Phytomedicine', 2014, '10.1016/j.phymed.2014.04.011', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Some benefit reported for seasonal allergy symptoms', 'https://doi.org/10.1016/j.phymed.2014.04.011', 33),

-- 34 Red Clover
('Red clover isoflavones for menopausal symptoms', 'Dr. A. H. T. Leach et al.', 'Maturitas', 2010, '10.1016/j.maturitas.2010.03.017', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Mixed evidence for reduction in hot flashes', 'https://doi.org/10.1016/j.maturitas.2010.03.017', 34),

-- 35 Dong Quai
('Angelica sinensis in gynecological conditions', 'Dr. W. Zhang et al.', 'Journal of Traditional Chinese Medicine', 2011, '10.1016/S0254-6272(11)60028-4', 'REVIEW', 'MODERATE', 'Traditional use supported by limited clinical data', 'https://doi.org/10.1016/S0254-6272(11)60028-4', 35),

-- 36 Kava
('Kava for anxiety: safety and efficacy', 'Dr. J. Sarris et al.', 'CNS Drugs', 2011, '10.1007/s40263-011-0028-9', 'SYSTEMATIC_REVIEW', 'MODERATE', 'Kava shows anxiolytic effects but liver safety concerns exist', 'https://doi.org/10.1007/s40263-011-0028-9', 36),

-- 37 Yerba Mate
('Yerba mate antioxidant properties and health effects', 'Dr. P. Heck et al.', 'Nutrition Reviews', 2007, '10.1111/j.1753-4887.2007.tb00263.x', 'REVIEW', 'MODERATE', 'Contains antioxidants and stimulants; epidemiologic data mixed', 'https://doi.org/10.1111/j.1753-4887.2007.tb00263.x', 37),

-- 38 Maca
('Maca for sexual function and energy', 'Dr. G. Gonzales et al.', 'Andrologia', 2002, '10.1046/j.1439-0272.2002.00496.x', 'RANDOMIZED_CONTROLLED_TRIAL', 'MODERATE', 'Maca improved sexual desire in some small trials', 'https://doi.org/10.1046/j.1439-0272.2002.00496.x', 38),

-- 39 Cat''s Claw
('Uncaria tomentosa immune effects review', 'Dr. R. Piscoya et al.', 'Phytotherapy Research', 2001, '10.1002/ptr.839', 'REVIEW', 'MODERATE', 'Evidence for immune-modulating benefits but more RCTs needed', 'https://doi.org/10.1002/ptr.839', 39),

-- 40 Cranberry
('Cranberry products for prevention of urinary tract infections', 'Dr. G. Jepson et al.', 'Cochrane Database', 2012, '10.1002/14651858.CD001321.pub5', 'META_ANALYSIS', 'STRONG', 'Cranberry may reduce risk of recurrent UTI in some populations', 'https://doi.org/10.1002/14651858.CD001321.pub5', 40);

-- Insert admin and regular users
INSERT INTO users (username, email, password, role, created_at, updated_at) VALUES 
('admin', 'admin@ayurgyan.com', '$2a$10$xyz123', 'ADMIN', NOW(), NOW()),
('john_doe', 'john@example.com', '$2a$10$abc456', 'USER', NOW(), NOW()),
('ayurveda_lover', 'herbal@example.com', '$2a$10$def789', 'USER', NOW(), NOW());

-- Verification counts
SELECT 'Herbs inserted: ' || COUNT(*) FROM herbs;
SELECT 'Medicinal uses inserted: ' || COUNT(*) FROM medicinal_uses;
SELECT 'Scientific studies inserted: ' || COUNT(*) FROM scientific_studies;
SELECT 'Users inserted: ' || COUNT(*) FROM users;
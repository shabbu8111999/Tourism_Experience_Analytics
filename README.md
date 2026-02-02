# Tourism_Experience_Analytics




## Project Strcuture

<pre>
tourism_experience_analytics/
│
├── data/
│   ├── raw/
│   │   ├── Transaction.csv
│   │   ├── User.csv
│   │   ├── City.csv
│   │   ├── Item.csv
│   │   ├── Continent.csv
│   │   ├── Country.csv
│   │   ├── Region.csv
│   │   ├── VisitMode.csv
│   │   └── Type.csv
│   │
│   └── processed/
│       └── final_dataset.csv
│
├── notebooks/
│   └── (all .ipynb files used earlier)
│
├── src/
│   ├── __init__.py
│
│   ├── data_preprocessing/
│   │   ├── __init__.py
│   │   ├── load_data.py
│   │   ├── clean_data.py
│   │   └── feature_engineering.py
│
│   ├── eda/
│   │   ├── __init__.py
│   │   └── eda_visualizations.py
│
│   ├── models/
│   │   ├── __init__.py
│   │   ├── regression_model.py
│   │   ├── classification_model.py
│   │   └── recommendation_model.py
│
│   ├── evaluation/
│   │   ├── __init__.py
│   │   └── metrics.py
│
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
│
├── app/
│   └── streamlit_app.py
│
├── requirements.txt
├── README.md
└── setup.py
</pre>
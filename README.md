# aegis-ai-soc-dashboard
AI-powered SOC dashboard simulating real-time cyber threat intelligence and MITRE ATT&amp;CK analysis

## 📁 Project Structure

```bash
aegis-ai-soc-dashboard/
│
├── README.md
├── requirements.txt
├── .gitignore
├── .env.example
├── main.py
│
├── src/
│   ├── app/
│   │   ├── dashboard.py
│   │   ├── api.py
│   │   └── ui_components.py
│   │
│   ├── core/
│   │   ├── threat_scoring.py
│   │   ├── ai_engine.py
│   │   ├── incident_classifier.py
│   │   └── confidence_meter.py
│   │
│   ├── data/
│   │   ├── sample_logs.json
│   │   ├── mock_alerts.py
│   │   └── geo_data.py
│   │
│   ├── utils/
│   │   ├── logger.py
│   │   ├── helpers.py
│   │   └── constants.py
│   │
│   └── config/
│       ├── settings.py
│       └── model_config.py
│
├── assets/
│   ├── screenshots/
│   ├── logo.png
│   └── demo.gif
│
├── tests/
│   ├── test_threat_scoring.py
│   ├── test_ai_engine.py
│   └── test_api.py
│
└── docs/
    ├── architecture.md
    └── api_reference.md
```

# from __future__ import annotations

import os
from typing import Optional
from google import genai
from google.genai import types
from dotenv import load_dotenv
import json
import re
from typing import Any
from datetime import date, datetime, timedelta


load_dotenv()  # loads GEMINI_API_KEY from .env if present

API_KEY = os.getenv("GEMINI_API_KEY")
HTTP_OPTS = types.HttpOptions(api_version="v1alpha")

def generate_text(prompt: str, model: str = "gemini-2.5-flash", *, api_key: Optional[str] = None) -> Any:
    key = api_key or API_KEY
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not set in the environment")

    # Use the Client as a context manager so close() is called deterministically.
    with genai.Client(api_key=key, http_options=HTTP_OPTS) as client:
        
        response = client.models.generate_content(model=model, contents=prompt)
        text = getattr(response, "text", str(response))
        
        # Try a direct JSON parse first
        try:
            print("returning JSON")
            returningJSON = json.loads(text)


            return returningJSON
            # return "end JSON"
        except json.JSONDecodeError:
            # If the model printed extra text around the JSON, extract the first JSON object/array
            m = re.search(r'(\{.*\}|\[.*\])', text, re.S)
            if m:
                candidate = m.group(1)
                try:
                    json_result = json.loads(candidate)
                    print("*" *25)
                    print("JSON result\n", json.dumps(json_result, indent=4))
                    print("*" *25)

                    date_now = date.today()
                    print(date_now)
                    cuttoff = date_now - timedelta(days=2)
                    print(cuttoff)

                    final_result = []

                    for x in json_result:
                        print("For x in ... :\n", x)
                        date_format = date.fromisoformat(x.get("date_of_article"))
                        print("Compare Dates: ", cuttoff, date_format)
                        print("T/F: ", cuttoff <= date_format)

                        if cuttoff <= date_format:
                            final_result.append(x)

                        print(final_result)

                    print(final_result)
                    return final_result
                except json.JSONDecodeError:
                    pass

    # If parsing fails, either raise or return the raw text:
    # raise ValueError("Model response was not valid JSON:\\n" + text)
    print("returning TEXT")
    return []  # or raise, depending on whether you want an exception

if __name__ == "__main__":
    
    # We need to grab user's portfolio to process this.
    company_list_sample = ["Google", "Microsoft", "Apple", "Meta"]
    string_list = ", ".join(company_list_sample)
 
    # Use an f-string so the string_list variable is interpolated into the prompt.
    main_prompt = f'For each company in the following portfolio: {string_list}, find 2-3 recent, significant news articles strictly within the past week from reputable financial sources. Using the article\'s content, historical stock data, and other relevant information, perform a sentiment analysis for each. Respond only with a JSON array, where each article is a JSON object with these exact keys: \"title\", \"short_summary\", \"url_link\", \"date_of_article\" (YYYY-MM-DD format only) and \"sentiment\" (with a value of \"Positive (Bullish)\", \"Negative (Bearish)\", or \'Neutral\').'
    
    try:
        # print("Prompt:", main_prompt)
        out = generate_text(main_prompt)

        print("Final: \n", json.dumps(out, indent=4))
        # print("\nResponse:\n", out)

    except Exception as e:
        print("Error running Gemini example:", e)

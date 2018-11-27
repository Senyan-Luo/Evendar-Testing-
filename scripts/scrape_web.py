import requests
from contextlib import closing
from bs4 import BeautifulSoup
import argparse
import sys

def parse_args(arguments):
    parser = argparse.ArgumentParser(description="Check help flag")
    parser.add_argument("-u", "--url", required=False, default="https://studentorg.ucsd.edu/", type=str, help="Path to UCSD Student Organization website")
    parser.add_argument("-o", "--output", required=False, default="./whitelist", type=str, help="Path to UCSD Student Organization website")
    return parser.parse_args()

def get_club_links(website):
    raw_html=requests.get(website, verify=False)
    html = BeautifulSoup(raw_html.text, 'html.parser')
    all_links = html.find_all('a')
    real_links = []
    for i in all_links:
        if "/Home/Details" in str(i):
            club = str(i).split(">")[0].split('"')[1][1:]
            real_links.append(club)
    return real_links

def extract_club_namesandemails(website, clubdict):
    print(website)
    raw_html=requests.get(website, verify=False)
    html = BeautifulSoup(raw_html.text, 'html.parser')
    club_name = html.select('h1')
    club = str(club_name[0]).split("<h1>")[1].split("</h1>")[0]
    email_link = html.select('a[href^=mailto] strong')
    email = str(email_link[0]).split("<strong>")[1].split("</strong>")[0]
    clubdict[club] = email
    return clubdict

def write_whitelist(dictionary, output):
    with open(output, 'w') as o:
        o.write("\"whitelist\": {\n")
        for clubs in dictionary:
            string = dictionary[clubs].replace(".", "%2E")
            o.write("\t\"%s\": true,\n" % string)
        o.write("}\n")

def main():
    args = parse_args(sys.argv[1:])
    club_links = get_club_links(args.url)
    club_contact_dictionary = {}
    for links in club_links:
        club_contact_dictionary = extract_club_namesandemails(args.url+links, club_contact_dictionary)
    write_whitelist(club_contact_dictionary, args.output)
if __name__=="__main__":
    main()

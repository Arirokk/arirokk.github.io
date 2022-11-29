/*
* @arirokk
* @29.11.22
*
* This assignment is from the third week of
* Java Programming: Solving Problems with Software course
* Given a CSV file with the particular format
* You can parse it and analyze with several methods
* You can find a .csv file in the folder to test this program
* You can look up words for search in the .csv file
*
* !!! The restart feature works ONLY if to instantiate the FileResource() class
* !!! with the constructor with the CSV file path as the parameter
*
*/

import edu.duke.*; // external
import org.apache.commons.csv.*; // external
import java.util.Scanner;

public class ParsingExportData {

    // takes the name of a country, returns its info
    private String countryInfo(CSVParser parser, String country) {
        for (CSVRecord record : parser) {
            String parseCountry = record.get("Country");
            String parseExports = record.get("Exports");
            String parseValue = record.get("Value (dollars)");
            if (parseCountry.equals(country)) {
                return parseCountry + ": " + parseExports + ": " + parseValue;
            }
        }
        return "NOT FOUND";
    }

    // option 1
    private void runCountryInfo() {
        String result = countryInfo(parseFile(),
                countryInput());
        System.out.println(result);
    }

    // takes two item names, writes countries that export it
    private void listExportersTwoProducts(CSVParser parser, String exportItem1, String exportItem2) {
        for (CSVRecord record : parser) {
            String parseCountry = record.get("Country");
            String parseExports = record.get("Exports");
            if (parseExports.contains(exportItem1)&&parseExports.contains(exportItem2)) {
                System.out.println(parseCountry);
            }
        }
    }

    // option 2
    private void runListExportersTwoProducts() {
        listExportersTwoProducts(parseFile(),
                firstExportProductsInput(),
                secondExportProductInput());
    }

    // takes an item name, returns number of countries that export it
    private int numberOfExporters(CSVParser parser, String exportItem) {
        int counter = 0;
        for (CSVRecord record : parser) {
            String parseExports = record.get("Exports");
            if (parseExports.contains(exportItem)) {
                counter++;
            }
        }
        return counter;
    }

    // option 3
    private void runNumberOfExporters() {
        int number = numberOfExporters(parseFile(),
                firstExportProductsInput());
        System.out.println(number);
    }

    // takes the length of a company value, writes companies with the equal or bigger length
    private void bigExporters(CSVParser parser, String value) {
        for (CSVRecord record : parser) {
            String parseCountry = record.get("Country");
            String parseValue = record.get("Value (dollars)");
            if (parseValue.length() >= value.length()) {
                System.out.println(parseCountry + " " + parseValue);
            }
        }
    }

    // option 4
    private void runBigExporters() {
        bigExporters(parseFile(),
                valueInput());
    }

    // the restart feature will work only if FileResource()
    // has the CSV file path as the parameter
    // something under the edu.duke hood, apparently
    private CSVParser parseFile() {
        FileResource fr = new FileResource("exportdata.csv");
        return fr.getCSVParser();
    }

    // likely it's worth to replace inputs with one method
    private String countryInput() {
        System.out.println("Type country name (Laos):");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }

    // these two methods should be reimplemented into one with an array
    private String firstExportProductsInput() {
        System.out.println("Type the first product name (gold):");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
    private String secondExportProductInput() {
        System.out.println("Type the second product name (diamonds):");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }

    private String valueInput() {
        System.out.println("Type value in format \"$xxx,xxx,xxx\" ($1,000,000,000,000):");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }

    public static void main(String[] args) {
        ParsingExportData exportData = new ParsingExportData();
        int option;
        System.out.println("Type 1 if you want to look at country info");
        System.out.println("Type 2 if you want to look at countries with particular goods for export");
        System.out.println("Type 3 if you want to look at the number of countries with a particular item export");
        System.out.println("Type 4 if you want to look at countries with the biggest export value");
        Scanner scanner = new Scanner(System.in);
        option = scanner.nextInt();
        // if type a char it falls into errors of course
        switch (option) {
            case 1 -> exportData.runCountryInfo();
            case 2 -> exportData.runListExportersTwoProducts();
            case 3 -> exportData.runNumberOfExporters();
            case 4 -> exportData.runBigExporters();
            default -> System.out.println("Incorrect input");
        }
        System.out.println("Type Y if you want to restart the program, or Enter to finish");
        // tried to implement restart, and it was the only simple way
        scanner = new Scanner(System.in);
        String termination = scanner.nextLine();
        args = new String[0];
        if (termination.equals("y")||termination.equals("Y")) {
            main(args);
        }
    }
}

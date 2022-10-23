/*
 * @arirokk
 * @22.10.22
 *
 * This code gets a text file with DNA, finds all genes that start from "atg"
 * and end with "taa" or "tag" or "tga"
 * You should import all classes from edu.duke (added in the folder)
 * To compile in the terminal (if the library in the same folder as .java)
 * "javac -cp package.jar Program.java"
 * to run the class int terminal
 * "java -cp .: package.jar Program"
 * Also you can find .fa files in dna's folder to test the program
 *
 *
 */

import edu.duke.*;
import java.io.File;

public class processingDNA {
    // find given stop codon from given index in given string
    public int findStopCodon(String dna, int startIndex, String stopCodon) {
        int currIndex = dna.indexOf(stopCodon, startIndex + 3);
        // check if index is out of the string
        while (currIndex != -1) {
            // check if codon's length is multiple of 3
            if ((currIndex - startIndex) % 3 == 0) {
                return currIndex;
            } else {
                // try the next iteration
                currIndex = dna.indexOf(stopCodon, currIndex + 1);
            }
        }
        // is for findGene function
        return -1;
    }

    // uncomment to test method above
    /* public void testFindSpotCodon() {
        int codon = findStopCodon("zzzztaaxxtaa", 6, "taa");
        System.out.println(codon);
        codon = findStopCodon("ccatgcctgaatgtaa", 0, "tag");
        System.out.println(codon);
    } */


    // find a whole gene
    public String findGene(String dna, int where) {
        int startIndex = dna.indexOf("atg", where);
        // check if start codon is in the string
        if (startIndex == -1) {
            return "";
        }
        int taaIndex = findStopCodon(dna, startIndex, "taa");
        int tagIndex = findStopCodon(dna, startIndex, "tag");
        int tgaIndex = findStopCodon(dna, startIndex, "tga");
        int minIndex = 0;
        // calculate what is the smallest index
        if (taaIndex == -1 || (tgaIndex != -1 && tgaIndex < taaIndex)) {
            minIndex = tgaIndex;
        } else {
            minIndex = taaIndex;
        }
        if (minIndex == -1 || (tagIndex != -1 && tagIndex < minIndex)) {
            minIndex = tagIndex;
        }
        // string hasn't stop codons
        if (minIndex == -1) {
            return "";
        }
        return dna.substring(startIndex, minIndex + 3);
    }

    // uncomment to test method above
    /* public void testFindGene() {
        String gene = findGene("ccatgcctgaatgtaa", 0);
        System.out.println(gene);
    } */

    // create a edu.duke database and add there all found in dna genes
    public StorageResource storeAllGenes(String dna) {
        int startIndex = 0;
        int counter = 0;
        StorageResource storage = new StorageResource();
        while (true) {
            String currGene = findGene(dna, startIndex);
            if (currGene.isEmpty()) {
                break;
            }
            counter = counter + 1;
            // System.out.println(currGene);
            storage.add(currGene);
            startIndex = dna.indexOf(currGene, startIndex) + currGene.length();
        }
        System.out.println("Number of genes is " + counter);
        return storage;
    }

    // uncomment to test method above
    /* public void testStoreAllGenes() {
        StorageResource deck = storeAllGenes("ccatgcctagaacatgtag");
        for (String line : deck.data()) {
            System.out.println(line);
        }
    } */

    // find all lines larger than 60 letters
    public void sixtyLength(StorageResource sr) {
        int counterSixty = 0;
        for (String line : sr.data()) {
            if (line.length() >= 60) {
                // System.out.println(line);
                counterSixty = counterSixty + 1;
            }
        }
        System.out.println("Number of genes longer than 60 is " + counterSixty);
    }

    // uncomment to test method above
    /* public void testNineLength() {
        StorageResource deck = storeAllGenes("ccatgttttaaccatgtgacatgcccaaatag");
        nineLength(deck);
    } */

    // find ratio between number of c + g and total number of chars
    public void cgRatio(StorageResource sr) {
        int counterCG = 0;
        for (String line : sr.data()) {
            // I took float because next I'll need the ratio
            float cgAmount = 0;
            int cIndex = line.indexOf("c");
            while (cIndex != -1) {
                cgAmount = cgAmount + 1;
                cIndex = line.indexOf("c", cIndex + 1);
            }
            // continue the same counter
            int gIndex = line.indexOf("g");
            while (gIndex != -1) {
                cgAmount = cgAmount + 1;
                gIndex = line.indexOf("g", gIndex + 1);
            }
            // seek for 0.35 ration
            if (cgAmount/line.length() > 0.35) {
                counterCG = counterCG + 1;
                // System.out.println(line);
            }
        }
        System.out.println("Number of genes with c/g ration more than 0.35 is " + counterCG);
    }

    // uncomment to test method above
    /* public void testCgRatio() {
        StorageResource deck = storeAllGenes("ccatgatgcccgggtgacatggggtag");
        cgRatio(deck);
    } */

    /* public void theLongestGene(StorageResource sr) {
        String longest = "";
        for (String line : sr.data()) {
            if (longest.length() < line.length()) {
                longest = line;
            }
        }
        System.out.println("The longest gene is " + longest);
    } */

    // uncomment to test method above
    /* public void testTheLongestGene() {
        StorageResource deck = storeAllGenes("ccatgtaattatgcccttttagatgtttcccggggtga");
        String longest = theLongestGene(deck);
        System.out.println(longest);
    } */

    // in lieu method .asString that didn't work
    public String toOneString(FileResource fr) {
        String dna = "";
        for (String line : fr.lines()) {
            dna = dna + line;
        }
        return dna;
    }

    // choose file from a directory
    public String makeString() {
        FileResource fr = new FileResource();
        String dna = fr.asString().toLowerCase();
        return dna;
    }
    
    public void processGenes() {
        String dna = makeString();
        StorageResource deck = storeAllGenes(dna);
        cgRatio(deck);
        sixtyLength(deck);

    }

    public static void main (String[] args) {
        processingDNA pdna = new processingDNA();
        pdna.processGenes();
    }
}

/*
 * @arirokk
 * @15.10.22
 *
 * The code lets you examine some shapes
 * You should import all classes from edu.duke (added in the folder)
 * To compile in terminal (if the library in the same folder as .java)
 * "javac -cp package.jar Program.java"
 * to run the class in the terminal
 * "java -cp .: package.jar Program"
 * Also you can find .txt files in the folder to test this program
 *
*/

import edu.duke.*;
import java.io.File;

public class PerimeterOfShape {
    // find the perimeter of a shape
    public double getPerimeter (Shape s) {
        double totalPerim = 0.0;
        // init the first point
        Point prevPt = s.getLastPoint();
        // for each point currPt in the shape,
        for (Point currPt : s.getPoints()) {
            // find distance from prevPt point to currPt
            double currDist = prevPt.distance(currPt);
            // update totalPerim by currDist
            totalPerim = totalPerim + currDist;
            // update prevPt to be currPt
            prevPt = currPt;
        }
        // totalPerim is the answer
        return totalPerim;
    }

    // calculate the numbers of points
    public int getNumPoints (Shape s) {
        int totalNumPoints = 0;
        for (Point currPt : s.getPoints()) {
            totalNumPoints = totalNumPoints + 1;
        }
        return totalNumPoints;
    }

    // calculate the average length of the side
    public double getAverageLength(Shape s) {
        double avgLength = getLargestSide(s)/getNumPoints(s);
        return avgLength;
    }

    // calculate the largest side of the shape
    public double getLargestSide(Shape s) {
        double largest = 0;
        Point prevPt = s.getLastPoint();
        for (Point currPt : s.getPoints()) {
            double currDist = prevPt.distance(currPt);
            if (largest < currDist) {
                largest = currDist;
            }
        }
        return largest;
    }

    // calculate the largest x-value of the node
    public int getLargestX(Shape s) {
        int largest = 0;
        Point prevPt = s.getLastPoint();
        for (Point currPt : s.getPoints()) {
            int currX = currPt.getX();
            if (largest < currX) {
                largest = currX;
            }
        }
        return largest;
    }

    // iterate through the files of the DirectoryResource
    // and find the one with the lergest perimeter
    public double getLargestPerimeterMultipleFiles() {
        double largestPerim = 0;
        DirectoryResource dr = new DirectoryResource();
        for(File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            Shape s = new Shape(fr);
            double currPerim = getPerimeter(s);
            if (largestPerim < currPerim) {
                largestPerim = currPerim;
            }
            return largestPerim;
        }
        return largestPerim;
    }

    // write the name of the file with the shape with the largest perimeter
    public String getFileWithLargestPerimeter() {
        File temp = null;
        double largestPerim = 0;
        DirectoryResource dr = new DirectoryResource();
        for (File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            Shape s = new Shape(fr);
            double currPerim = getPerimeter(s);
            if (largestPerim < currPerim) {
                largestPerim = currPerim;
                temp = f;
            }
        }
        return temp.getName();
    }

    // consider some shape from the file
    public void testPerimeter () {
      // the way to pick the file from the directory
        FileResource fr = new FileResource();
        Shape s = new Shape(fr);
        double length = getPerimeter(s);
        int numPoints = getNumPoints(s);
        double largestSide = getLargestSide(s);
        int largestX = getLargestX(s);
        System.out.println("Perimeter is " + length + "; Number of points is " + numPoints);
        System.out.println("Largest side is " + largestSide + "; Largest X value is " + largestX);
    }

    // this method creates a triangle that you can use to test your other methods
    public void triangle() {
        Shape triangle = new Shape();
        triangle.addPoint(new Point(0, 0));
        triangle.addPoint(new Point(6, 0));
        triangle.addPoint(new Point(3, 6));
        for (Point p : triangle.getPoints()){
            System.out.println(p);
        }
        double peri = getPerimeter(triangle);
        System.out.println("The perimeter is " + peri);
    }

    // this method prints the names of all the files in
    // the chosen folder
    public void printFileNames() {
        DirectoryResource dr = new DirectoryResource();
        for (File f : dr.selectedFiles()) {
            System.out.println(f);
        }
    }

    // consider different shapes from the directory
    // to show the largest perimeter
    public void testPerimeterMultipleFiles() {
        double largestPerimeter = getLargestPerimeterMultipleFiles();
        System.out.println("The largest perimeter is " + largestPerimeter);
    }

    // consider different shapes from the file
    // to show the name of the shape with the largest perimeter
    public void testFileWithLargestPerimeter() {
        String largestPerimeterName = getFileWithLargestPerimeter();
        System.out.println("File with the shape that has the largest perimeter is " + largestPerimeterName);
    }

    public static void main (String[] args) {
        PerimeterOfShape pr = new PerimeterOfShape();
        pr.testFileWithLargestPerimeter();
    }
}

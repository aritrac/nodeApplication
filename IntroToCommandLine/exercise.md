##Command Line Basics Exercise

*Make a new folder named "Animals"
*$mkdir Animals

*Inside of "Animals" add 2 directories: "AwesomeAnimals" and "SketchyAnimals" 
*$cd Animals
*$mkdir AwesomeAnimals
*$mkdir SketchyAnimals

*Inside of "AwesomeAnimals" add the following files: "Capybara.js", "ArcticFox.html", and "TreeFrog.txt"
*$cd AwesomeAnimals
*$touch Capybara.js
*$touch ArcticFox.html
*$touch TreeFrog.html

*Inside of "SketchyAnimals" add the following files: "BrownRecluse.html" and "BulletAnt.js"
*$cd ..
*$cd SketchyAnimals
*$touch BrownRecluse.html
*$touch BulletAnt.js

*Also inside of "SketchyAnimals" create a "Snakes" directory. Snakes are extra sketchy.
*$mkdir Snakes

*Inside of the "Snakes" directory create the following files: "Cobra.css" and "ReticulatedPython.py"
*$cd Snakes
*$touch Cobra.css
*$touch ReticulatedPython.py

*You have a change of heart and decide that Bullet Ants are no longer sketchy. Remove the "BulletAnt.js" file.
*$cd ..
*$rm BulletAnt.js

*All animal life goes extinct. Delete the entire "Animals" directory
*$cd ..
*$cd ..
*$rm -rf Animals

**BONUS: See if you can do this without ever changing directories (without using cd)**
*$mkdir Animals
*$mkdir Animals/AwesomeAnimals Animals/SketchyAnimals
*$touch Animals/AwesomeAnimals/Capybara.js Animals/AwesomeAnimals/ArcticFox.html Animals/AwesomeAnimals/TreeFrog.txt
*$touch Animals/SketchyAnimals/BrownRecluse.html Animals/SketchyAnimals/BulletAnt.js
*$mkdir Animals/SketchyAnimals/Snakes
*$touch Animals/SketchyAnimals/Snakes/Cobra.css Animals/SketchyAnimals/Snakes/ReticulatedPython.py
*$rm Animals/SketchyAnimals/BulletAnt.js
*$rm -rf Animals
# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

------------------------------------------------------------------------------------

Before I get into it I have a couple points to make,

First, I had to make a function that would make distance matrices, this wasn't hard but it was a significant time saver than trying different matrices I made up, it generates an matrix and is filled with random numbers between 0 and 19.

Second, as seen in the code, held karp and local search are both run with different matrices, this is because local search is so much faster that I had to use much larger input sizes that the held karp just couldn't handle, this split is only for the timings as I believe that they still serve their intended purpose, the comparison between their tour lengths is only done using the exact same matrix, otherwise the paths wouldn't necessarily be comparible to each other.

Last, I chose to keep the graphs in milliseconds due to how vs code's console.time works, while it does go into mm\:ss\:mmm format at some point I wanted to keep things as similar as possible and so I used the smallest unit, which in this case was milliseconds; this meant that there are some very large values but I think that since the input size is more important for this comparison that it is acceptible.

Now then I talk about the data collected.

Starting off with Held Karp, we can see that this algorithm is pretty consistent at first but around matrix size 10 it starts to really spike in the amount of time it takes it to find a path.

![Held Karp](https://github.com/COSC3020/tsp-comparison-jataylor111-1/blob/main/Held%20Karp%20Chart.png))

As we can see from the above graph it reaches an hour on only a matrix of length 11, which is all things considered a very short amount of time

Next I will talk about Local Search, for this one I had to do a lot of playing around with the input sizes to find the hour mark, this algorithm can handle much larger input sizes than the Held Karp algorithm.  I also wanted to keep it in line with the amount of rounds I ran the held karp for so it increases in input size fairly quickly

![Local Search](https://github.com/COSC3020/tsp-comparison-jataylor111-1/blob/main/Local%20Search%20Chart.png)

It also has a much smoother increase instead of the drastic jump that the Held Karp made.

Now, as we can see from the two graphs above they behave relatively similarly, however, the key difference are the input sizes, while the Held Karp could only handle input sizes of 11 at the most before it reached an hour, the Local Search algorithm took roughly an input size of 4000 to reach it.  This shows that in terms of the input sizes Local Search wins out time efficiency, but as I'll talk about here in a moment, this is not always the best.

Let's get to the tour length comparison.

Below is a graph comparing the two algorithms to each other based not on time but only on the tour length

![Tour Comparison](https://github.com/COSC3020/tsp-comparison-jataylor111-1/blob/main/Comparison.png)

As we can see the difference between the two is quite noticable.  They both hold out relatively similarly to each other in the smaller input sizes but pretty quickly the Local Search just takes off while the Held Karp keeps below it.  This shows that the Held Karp algorithm will generally find a much shorter path to the Local Search algorithm.

To conclude, 

This data shows that both have their ups and downs.  Held Karp is much less time efficient but gets much shorter tour paths while the Local Search will get you an answer sooner, but that answer probably won't be the most ideal path.


I needed to use this Stack Overflow link to get the syntax for adding my graphs to the Readme (https://stackoverflow.com/questions/14494747/how-to-add-images-to-readme-md-on-github)

Excel is the software I used to make my graphs.

For this comparison I asked my friend Cade if I could borrow his Held Karp algorithm which can be found here (https://github.com/COSC3020/tsp-held-karp-CadeMaynard)

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice

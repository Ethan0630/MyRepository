package com.example;

public class test1 {
    public static void main(String[] args) {
        int[] arr = { 1, 2 };
        average(arr);

    }

    public static void average(int[] nums) {
        double average = 0;

        if (nums.length <= 2) {
            System.out.println("陣列長度需大於2!");
            return;
        }

        for (int i = 1; i < nums.length - 1; i++) {
            average += nums[i];
        }

        average = average / (nums.length - 2);

        System.out.print("average = " + average);
    }
}

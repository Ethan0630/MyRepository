package com.example;

public class test {
    public static void main(String[] args) {
        // int sum = 0;
        // for (int i = 3; i <= 9999; i += 3) {
        // sum += i;
        // System.out.print(i + " ");
        // }
        // System.out.println(sum);
        int[] arr = { -4, -3, -2 };
        int r = maxProduct(arr);
        System.out.print(r);
    }

    public static int maxProduct(int[] nums) {
        int max = nums[0];
        int min = nums[0];
        int result = nums[0];

        for (int i = 1; i < nums.length; i++) {

            if (nums[i] < 0) {
                int temp = max;
                max = min;
                min = temp;
            }

            max = Math.max(nums[i], nums[i] * max);
            min = Math.min(nums[i], nums[i] * min);

            result = Math.max(result, max);
        }
        return result;
    }
}

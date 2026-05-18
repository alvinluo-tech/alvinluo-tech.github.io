---
title: "Clever Adam - Literature Review: Robust Optimization under Heavy-Tailed Gradient Noise"
published: 2026-05-18
description: "A survey of adaptive optimizers, heavy-tailed gradient noise theory, gradient clipping, and robust estimation methods — and where Clever Adam fits in."
tags: ["Research", "Deep Learning", "Optimization", "Heavy-Tailed Noise"]
category: projects
draft: false
pinned: false
---

## Introduction

Stochastic gradient descent (SGD) and its adaptive variants are the workhorses of modern deep learning. A growing body of evidence shows that the stochastic gradients encountered in practice are far from well-behaved: their distribution is typically *heavy-tailed*, exhibiting infinite or near-infinite variance and frequent large outliers [1]. This violates the light-tailed (e.g., sub-Gaussian) assumptions underlying classical convergence theory and degrades the performance of standard optimizers.

This review surveys three lines of research that address this challenge: (i) adaptive optimization methods, (ii) gradient clipping and normalization, and (iii) robust gradient estimation and sign-based approaches.

---

## Adaptive Optimization Methods

**Adam** [2] combines momentum with per-parameter adaptive learning rates via estimates of the first and second moments of the gradient. Despite its popularity, Adam has known convergence issues.

**AMSGrad** [3] identified that the exponential moving average of squared gradients can cause the effective step size to increase, violating monotone convergence guarantees. The fix — maintaining the maximum of past squared gradients — restores convergence in the convex setting but comes at a cost in practice.

Two subsequent variants target different shortcomings:

- **RAdam** [4] observes that the variance of the adaptive learning rate is unreliable during the early training phase (when the second-moment estimate has high bias) and introduces a variance-rectification term to stabilize warm-up.
- **AdaBelief** [5] replaces the second-moment denominator with the variance of the gradient relative to the momentum direction, i.e., it adapts step sizes based on how much the observed gradient *deviates* from its predicted value. This "belief" mechanism yields faster convergence and better generalization in many settings.
- **BDS-Adam** [6] addresses biased gradient estimation and early-training instability through a dual-path framework combining nonlinear gradient mapping with adaptive variance rectification.

A fundamentally different design philosophy emerges in sign-based optimizers. **Lion** [7], discovered via symbolic search, uses only the sign of the momentum to update parameters. Its simplicity and competitive performance suggest that discarding gradient magnitude entirely — rather than adapting it — can be a viable strategy in noisy settings.

> **Key gap:** None of these methods explicitly detects or adapts to the *tail behavior* of the gradient noise. Their convergence guarantees either assume bounded second moments (Adam, AMSGrad, RAdam, AdaBelief) or do not distinguish between light-tailed and heavy-tailed regimes (Lion, BDS-Adam). In practice, the same update rule is applied regardless of whether the observed noise is benign or adversarial.

---

## Heavy-Tailed Gradient Noise: Theory and Evidence

The seminal work of Gürbüzbalaban et al. [1] established that SGD iterates converge to a heavy-tailed stationary distribution, even for smooth losses with bounded gradients. The tail index $\alpha$ (governing the power-law decay of the gradient distribution) depends on the batch size, learning rate, and network architecture: smaller batch sizes and deeper networks yield heavier tails — a regime that is increasingly common in large-scale training.

Subsequent work has deepened this picture from multiple angles:

- **Raj et al.** [8] analyzed the algorithmic stability of heavy-tailed SGD, showing that heavy noise degrades generalization bounds.
- **Zhang et al.** [9] proved that non-convex SGD with heavy-tailed noise can still converge, but the rate depends critically on the tail index and the clipping threshold.
- **Kunstner et al.** [10] challenged the simplistic narrative that noise alone explains the SGD–Adam gap on Transformers, arguing instead that the *sign structure* of the gradient — rather than its variance — may be the dominant factor.
- **Fatkhullin et al.** [11] recently proved that vanilla SGD can achieve minimax-optimal convergence under heavy-tailed noise, but only in probability (not in high probability), leaving room for methods that provide stronger guarantees.

These results collectively motivate the design of optimizers that are *aware* of the noise regime and adapt their update rule accordingly.

---

## Gradient Clipping and Normalization

Gradient clipping — truncating the gradient norm when it exceeds a threshold — is the most widely adopted defense against heavy-tailed noise.

- **Sadiev et al.** [12] established high-probability convergence guarantees for clipped gradient methods under heavy-tailed noise, showing that a fixed clipping threshold suffices to restore $\mathcal{O}(1/\sqrt{T})$ rates even when the noise has only bounded $p$-th moments for $p \in (1,2]$.
- **Hübler et al.** [13] provided a unified analysis connecting gradient clipping to gradient normalization, demonstrating that both can be viewed as projections onto a bounded set, with the choice between them trading off bias and variance.
- **Sun et al.** [14] revisits this comparison for non-convex SGD, establishing tighter convergence rates and clarifying when normalization is preferable to clipping. They further demonstrated that gradient normalization alone — without clipping — is sufficient to ensure SGD convergence under heavy-tailed noise.
- **Chen et al.** [15] shows that clipping provably improves Adam-Norm and AdaGrad-Norm specifically when the noise is heavy-tailed, providing direct justification for integrating clipping into adaptive methods.
- Clipped SGD has also been extended to the convex $(L_0, L_1)$-smooth setting [16], broadening its applicability beyond standard smoothness assumptions.

> **Key limitation:** The clipping threshold remains a hyperparameter that must be tuned; an adaptive mechanism that sets this threshold based on observed noise characteristics would be substantially more practical — a direction we pursue in our work.

---

## Robust Gradient Estimation and Sign-Based Methods

A fundamentally different approach to heavy-tailed noise replaces the gradient mean with a more robust estimator.

### Sign-based methods

**SignSGD** [17] transmits only the sign of each gradient component, achieving compression and implicit robustness: the sign operation naturally clips extreme values. **Korotin et al.** [18] provided high-probability convergence bounds for the sign operator under heavy-tailed noise, demonstrating that sign-based updates provably mitigate the effect of heavy tails at the cost of slower convergence in the light-tailed regime. **Jiang et al.** [19] improved the convergence rate of signSGD through variance reduction via control variates, narrowing the gap with full-gradient methods.

### Median-based methods

**Schaipp et al.** [20] developed a stochastic proximal point method that tracks the median of gradient mini-batches rather than the mean, establishing a formal connection between clipping and median estimation that was not previously known. The **R-SGD-Mini** framework [21] generalizes this to medoid-based sampling, providing finite-sample guarantees under heavy-tailed noise without requiring gradient clipping. Classical robust estimation theory [22] underpins these approaches, showing that influence-function-based gradient estimators can achieve $\sqrt{n}$-consistency even under Huber $\varepsilon$-contamination.

### Adaptive heavy-tailed methods

The **AHTSGD** framework [23] is perhaps the closest prior work to our setting: it dynamically injects $\alpha$-stable noise with a tail index that adapts based on exponentially averaged log-sharpness, transitioning from heavy-tailed (small $\alpha$, for exploration) to lighter-tailed (large $\alpha \to 2$, for convergence) as training progresses.

However, AHTSGD operates on a fundamentally different principle from our work: it *injects* synthetic heavy-tailed noise to escape sharp minima, rather than *detecting and responding to* the inherent heavy-tailed noise in the gradient distribution. Moreover, AHTSGD's noise adaptation relies on log-sharpness of the loss landscape — an indirect geometric proxy — whereas our noise monitor directly estimates tail statistics of the gradient distribution itself (norm CV, top-$k$ extremal ratios, and moving-average deviation), providing a more direct and responsive signal.

---

## Research Gap and Motivation

The literature reveals a precise gap that no existing method fills.

**Adaptive optimizers** (Adam, AMSGrad, RAdam, AdaBelief, BDS-Adam) are the default in deep learning but apply a fixed update rule regardless of the noise regime. Their convergence proofs assume bounded second moments; when this assumption is violated — as it routinely is in practice [1] — they offer no guarantees and degrade empirically. Lion [7] sidesteps this by discarding magnitude entirely, but this is a blunt instrument: in light-tailed settings where Adam's adaptive scaling is beneficial, Lion leaves performance on the table.

**Robust methods** (clipping, normalization, sign-based, median-based) provide strong defenses against heavy-tailed noise but are typically applied as *fixed wrappers* around SGD. They require manual tuning of thresholds (clipping) or incur higher computational cost (median-based), and — critically — they do not integrate with Adam's momentum and curvature estimates. Chen et al. [15] proved that clipping helps Adam under heavy tails, but the clipping threshold was fixed a priori rather than adapted to the observed noise.

**Adaptive heavy-tailed methods** come closest to our vision, but with a fundamental mismatch. AHTSGD [23] adaptively controls the *injection* of synthetic noise for exploration; it does not detect or respond to the *inherent* heavy-tailed noise in the gradient distribution, nor does it integrate with Adam-family optimizers.

### The gap is threefold:

1. No existing optimizer **directly monitors the tail statistics** of the gradient distribution in real time (as opposed to indirect proxies such as loss landscape sharpness)
2. No method **smoothly transitions** between standard and robust update modes within a single optimizer
3. No approach **integrates** noise-aware adaptation with Adam's momentum and curvature estimates

This motivates **Clever Adam**, which addresses all three deficiencies through a lightweight noise monitor (gradient norm CV, top-$k$ extremal ratios, and moving-average deviation), a dual-regime update that applies standard Adam under light-tailed noise and switches to clipped/sign-based updates under heavy-tailed noise, and a smooth blending gate $\alpha = \sigma(f(\text{tail\_metric}))$ that avoids abrupt mode transitions.

---

## References

[1] Gürbüzbalaban, M., Ozdaglar, A., Pattathil, S., et al. "The Heavy-Tail Phenomenon in SGD." *ICML*, 2021.

[2] Kingma, D. P. and Ba, J. "Adam: A Method for Stochastic Optimization." *ICLR*, 2015.

[3] Reddi, S. J., Kale, S., and Kumar, S. "On the Convergence of Adam and Beyond." *ICLR*, 2019.

[4] Liu, L., Jiang, H., He, P., et al. "RAdam: On the Variance of the Adaptive Learning Rate and Beyond." *ICLR*, 2020.

[5] Zhuang, J., Tang, T., Ding, Y., et al. "AdaBelief Optimizer: Adapting Stepsizes by the Belief in Observed Gradients." *NeurIPS*, 2020.

[6] Shao, Y., Weng, S., Sun, H., et al. "BDS-Adam: Adaptive Variance Rectification with Semi-Adaptive Gradient Smoothing." *Scientific Reports*, 2025.

[7] Chen, X., Liang, C., Huang, D., et al. "Symbolic Discovery of Optimization Algorithms." *NeurIPS*, 2023.

[8] Raj, A., et al. "Algorithmic Stability of Heavy-Tailed SGD with General Loss Functions." *AISTATS*, 2023.

[9] Zhang, J., et al. "Robustness Analysis of Non-Convex Stochastic Gradient Descent with Heavy-Tailed Noise." *NeurIPS*, 2020.

[10] Kunstner, F., Chen, J., Lücke, J., et al. "Noise Is Not the Main Factor Behind the Gap Between SGD and Adam on Transformers, but Sign Descent Might Be." *ICLR*, 2023.

[11] Fatkhullin, I., Hübler, F., and Lan, G. "Can SGD Handle Heavy-Tailed Noise?" *NeurIPS Workshop*, 2025.

[12] Sadiev, A., et al. "Improved Convergence in High Probability of Clipped Gradient Methods with Heavy Tailed Distributed Noise." *NeurIPS*, 2023.

[13] Hübler, F., He, N., et al. "From Gradient Clipping to Normalization for Heavy Tailed SGD." *NeurIPS*, 2024.

[14] Sun, T., Liu, X., and Yuan, K. "Revisiting Gradient Normalization and Clipping for Nonconvex SGD under Heavy-Tailed Noise." *JMLR*, 2025.

[15] Chen, X., Zhou, Y., and Wang, Z. "Clipping Improves Adam-Norm and AdaGrad-Norm when the Noise Is Heavy-Tailed." *arXiv:2406.07780*, 2024.

[16] Chezhegov, D., Beznosikov, A., et al. "Convergence of Clipped-SGD for Convex $(L_0, L_1)$-Smooth Optimization with Heavy-Tailed Noise." *arXiv:2505.20817*, 2025.

[17] Bernstein, J., Wang, Y.-X., Azizzadenesheli, K., and Anandkumar, A. "signSGD: Compressed Optimisation for Non-Convex Problems." *ICML*, 2018.

[18] Korotin, A., et al. "Sign Operator for Coping with Heavy-Tailed Noise: High Probability Convergence Bounds and Beyond." *arXiv:2502.07923*, 2025.

[19] Jiang, W., Yang, S., Yang, W., and Zhang, L. "Efficient Sign-Based Optimization: Accelerating Convergence via Variance Reduction." *NeurIPS*, 2024.

[20] Schaipp, F., Garrigos, G., Simsekli, U., and Gower, R. "Tracking the Median of Gradients with a Stochastic Proximal Point Method." *TMLR*, 2025.

[21] Vukovic, M. and Jakovetic, D. "Robust Stochastic First Order Methods in Heavy-Tailed Noise via Medoid Mini-Batch Gradient Sampling." *arXiv:2605.07634*, 2025.

[22] Prasad, A., Suggala, A. S., Balakrishnan, S., and Ravikumar, P. "Robust Estimation via Robust Gradient Estimation." *JRSS-B*, 2020.

[23] Gong, B., Batista, G., and Micheaux, P. L. D. "Adaptive Heavy-Tailed Stochastic Gradient Descent." *arXiv:2508.21353*, 2025.
